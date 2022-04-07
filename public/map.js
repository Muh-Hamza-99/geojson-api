mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFtemFmdWxsc3RhY2siLCJhIjoiY2tzaGM1YTcxMXNrajJ2bzNwNmV2ZjdzaCJ9.CcyRHnnxNHkSonZj2Dl1Sg";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
});

function loadMap(stores) {
  map.on("load", () => {
    map.addSource("point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores,
        },
      });
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "point", 
        layout: {
          "icon-image": "{icon}-15", 
          "icon-size": 1.5,
          "text-field": "{storeID}",
          "text-font": ["Open Sans Semibold"],
          "text-offset": [0, 0.9],
          "text-anchor": "top",
        },
      });
  });
};

async function getStores() {
    const response = await fetch("/api/v1/stores");
    const { data } = await response.json();
    const stores = data.stores.map(store => {
        return {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [store.location.coordinates[0], store.location.coordinates[1]],
            },
            properties: {
                storeID: store.storeID,
                icon: "shop",
            },
        };
    });
    loadMap(stores);
};