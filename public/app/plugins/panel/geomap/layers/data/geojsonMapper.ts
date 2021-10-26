import { MapLayerRegistryItem, MapLayerOptions, PanelData, GrafanaTheme2, PluginState } from '@grafana/data';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { getGeoMapStyle } from '../../utils/getGeoMapStyle';
import { checkFeatureMatchesStyleRule } from '../../utils/checkFeatureMatchesStyleRule';
import { ComparisonOperation, FeatureStyleConfig } from '../../types';
import { Fill, Stroke, Style } from 'ol/style';
import { FeatureLike } from 'ol/Feature';
import { GeomapStyleRulesEditor } from '../../editor/GeomapStyleRulesEditor';
import CircleStyle from 'ol/style/Circle';
export interface GeoJSONMapperConfig {
  // URL for a geojson file
  src?: string;

  // Styles that can be applied
  styles: FeatureStyleConfig[];
}

const defaultOptions: GeoJSONMapperConfig = {
  src: 'public/maps/countries.geojson',
  styles: [],
};

export const DEFAULT_STYLE_RULE: FeatureStyleConfig = {
  fillColor: '#1F60C4',
  strokeWidth: 1,
  rule: {
    property: '',
    operation: ComparisonOperation.EQ,
    value: '',
  },
};

export const geojsonMapper: MapLayerRegistryItem<GeoJSONMapperConfig> = {
  id: 'geojson-value-mapper',
  name: 'Map values to GeoJSON file',
  description: 'color features based on query results',
  isBaseMap: false,
  state: PluginState.alpha,

  /**
   * Function that configures transformation and returns a transformer
   * @param options
   */
  create: async (map: Map, options: MapLayerOptions<GeoJSONMapperConfig>, theme: GrafanaTheme2) => {
    const config = { ...defaultOptions, ...options.config };

    const source = new VectorSource({
      url: config.src,
      format: new GeoJSON(),
    });

    const defaultStyle = new Style({
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: DEFAULT_STYLE_RULE.fillColor,
          width: DEFAULT_STYLE_RULE.strokeWidth,
        }),
        fill: new Fill({color: 'red'}),
      }),
      stroke: new Stroke({
        color: DEFAULT_STYLE_RULE.fillColor,
        width: DEFAULT_STYLE_RULE.strokeWidth,
      }),
    });

    const styles = config?.styles ?? [];
    if(!styles.length) {
      styles.push
    }
    const vectorLayer = new VectorLayer({
      source,
      style: (feature: FeatureLike) => {
        const geom = feature?.getGeometry();
        if(!geom) {
          return defaultStyle;
        }

        // if(geom.getType() === 'Point') {
        //   return new Style({
        //     image: new CircleStyle({
        //       radius: 5,
        //       stroke: new Stroke({color: 'red', width: 1}),
        //       fill: new Fill({color: 'red'}),
        //     }),
        //   });
        // }

        if (feature && config?.styles?.length) {
          for (const style of config.styles) {
            //check if there is no style rule or if the rule matches feature property
            if (!style.rule || checkFeatureMatchesStyleRule(style.rule, feature as Feature<Geometry>)) {
              return getGeoMapStyle(style, feature);
            }
          }
        }

        return defaultStyle;
      },
    });

    return {
      init: () => vectorLayer,
      update: (data: PanelData) => {
        // console.log('todo... find values matching the ID and update');

        // // Update each feature
        // source.getFeatures().forEach((f) => {
        //   console.log('Find: ', f.getId(), f.getProperties());
        // });
      },
    };
  },

  // Geojson source url
  registerOptionsUI: (builder) => {
    builder
      .addSelect({
        path: 'config.src',
        name: 'GeoJSON URL',
        settings: {
          options: [
            { label: 'public/maps/countries.geojson', value: 'public/maps/countries.geojson' },
            { label: 'public/maps/usa-states.geojson', value: 'public/maps/usa-states.geojson' },
            { label: 'public/gazetteer/airports.geojson', value: 'public/gazetteer/airports.geojson' },
          ],
          allowCustomValue: true,
        },
        defaultValue: defaultOptions.src,
      })
      .addCustomEditor({
        id: 'config.styles',
        path: 'config.styles',
        name: 'Style Rules',
        editor: GeomapStyleRulesEditor,
        settings: {},
        defaultValue: [],
      });
  },
  defaultOptions,
};
