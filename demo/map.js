initMap = () => {
    return new Promise(function (resolve, reject) {
        mapboxgl.accessToken = 'pk.eyJ1Ijoib3NzIiwiYSI6ImNpcTBreWFmdjAwMHBoeG5kajNqbzRpcmEifQ.z4809O9OKkLgrBmHx2inmA';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v8',
            center: [18.08, 59.31],
            pitch: 45,
            zoom: 9.5,
            attributionControl: false
        });

        map.on('load', () => {

            map.addLayer({
                'id': 'sky',
                'type': 'sky',
                'paint': {
                    'sky-type': 'gradient',
                    'sky-gradient': [
                        'interpolate',
                        ['linear'],
                        ['sky-radial-progress'],
                        0.8,
                        'rgba(135, 206, 235, 1.0)',
                        1,
                        'rgba(0,0,0,0.1)'
                    ],
                    'sky-gradient-center': [0, 0],
                    'sky-gradient-radius': 90,
                    'sky-opacity': [
                        'interpolate',
                        ['exponential', 0.1],
                        ['zoom'],
                        5,
                        0,
                        22,
                        1
                    ]
                }
            });

            map.addSource('offices-points', {
                'type': 'geojson',
                'data': { type: 'FeatureCollection', features: [] }
            });
            map.addSource('offices', {
                'type': 'geojson',
                'data': { type: 'FeatureCollection', features: [] }
            });

            map.addSource('sites', {
                'type': 'geojson',
                'data': 'data/sites.json'
            });

            map.addLayer({
                id: "hue",
                type: "circle",
                source: 'offices-points',
                "paint": {
                    "circle-pitch-alignment": 'map',
                    "circle-color": "#4CAF50",
                    "circle-opacity": 0.2,
                    "circle-radius": {
                        "base": 1,
                        "stops": [
                            [
                                1,
                                0
                            ],
                            [
                                5,
                                0.1
                            ],
                            [
                                11,
                                30
                            ],
                            [
                                18,
                                70
                            ]
                        ]
                    },
                    "circle-blur": 1
                },

            });

            map.addLayer({
                id: "points",
                type: "circle",
                source: 'offices-points',
                "paint": {
                    "circle-pitch-alignment": 'map',
                    "circle-color": "#DFF1E0",
                    "circle-radius": {
                        "base": 1,
                        "stops": [
                            [
                                1,
                                0.1
                            ],
                            [
                                5,
                                0.3
                            ],
                            [
                                11,
                                3
                            ],
                            [
                                18,
                                10
                            ]
                        ]
                    },
                    "circle-blur": 0.3
                },

            });

            map.addLayer({
                id: "label",
                type: "symbol",
                source: 'offices-points',
                layout: {
                    "text-field": ["get", "office"],
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top",
                    "text-size": {
                        "base": 1,
                        "stops": [
                            [
                                1,
                                0
                            ],
                            [
                                12,
                                0
                            ],
                            [
                                18,
                                20
                            ]
                        ]
                    }
                },
                paint: {
                    "text-color": "#ffffdd"
                }
            });

            map.addLayer({
                id: "sites-points",
                type: "circle",
                source: 'sites',
                "paint": {
                    "circle-pitch-alignment": 'map',
                    "circle-color": "#0000fE",
                    "circle-radius": {
                        "base": 1,
                        "stops": [
                            [
                                1,
                                0.5
                            ],
                            [
                                5,
                                1
                            ],
                            [
                                11,
                                6
                            ],
                            [
                                18,
                                20
                            ]
                        ]
                    },
                    "circle-blur": 0
                },

            });

            map.addLayer({
                'id': 'revenue',
                'type': 'fill-extrusion',
                'source': 'offices',
                'layout': {
                    'visibility': "none"
                },
                'paint': {
                    'fill-extrusion-color': '#22ff22',
                    'fill-extrusion-height': ['get', 'revenue'],
                    'fill-extrusion-base': 0,
                    'fill-extrusion-opacity': 0.8
                }
            });

            map.addLayer({
                'id': 'cost',
                'type': 'fill-extrusion',
                'source': 'offices',

                'layout': {
                    'visibility': "none"
                },
                'paint': {
                    'fill-extrusion-color': [
                        "interpolate", ["linear"], ['get', 'cost'],
                        0, 'green',
                        100, 'yellow',
                        500, 'red'
                    ],
                    'fill-extrusion-height': ['*', 10, ['get', 'cost']],
                    'fill-extrusion-base': 0,
                    'fill-extrusion-opacity': 0.8
                }
            });

            map.addLayer({
                'id': 'numOffices',
                'type': 'fill-extrusion',
                'source': 'offices',

                'layout': {
                    'visibility': "none"
                },
                'paint': {
                    'fill-extrusion-color': '#22ffff',
                    'fill-extrusion-height': ['get', 'numOffices'],
                    'fill-extrusion-base': 0,
                    'fill-extrusion-opacity': 0.8
                }
            });

            map.addLayer({
                'id': 'nearbyOffices',
                'type': 'fill-extrusion',
                'source': 'offices',

                'layout': {
                    'visibility': "none"
                },
                'paint': {
                    'fill-extrusion-color': '#ffff22',
                    'fill-extrusion-height': ['get', 'nearby'],
                    'fill-extrusion-base': 0,
                    'fill-extrusion-opacity': 0.8
                }
            });

            map.addLayer({
                'id': 'sustainability',
                'type': 'fill-extrusion',
                'source': 'offices',

                'layout': {
                    'visibility': "none"
                },
                'paint': {
                    'fill-extrusion-color': '#ffff22',
                    'fill-extrusion-height': ['get', 'sustainability'],
                    'fill-extrusion-base': 0,
                    'fill-extrusion-opacity': 0.8
                }
            });

            map.addLayer({
                'id': 'equality',
                'type': 'fill-extrusion',
                'source': 'offices',

                'layout': {
                    'visibility': "none"
                },
                'paint': {
                    'fill-extrusion-color': '#ffff22',
                    'fill-extrusion-height': ['get', 'equality'],
                    'fill-extrusion-base': 0,
                    'fill-extrusion-opacity': 0.8
                }
            });

            map.addLayer({
                'id': 'score',
                'type': 'fill-extrusion',
                'source': 'offices',

                'layout': {
                    'visibility': "none"
                },
                'paint': {
                    'fill-extrusion-color': '#ffffff',
                    'fill-extrusion-height': ['get', 'score'],
                    'fill-extrusion-base': 0,
                    'fill-extrusion-opacity': 0.8
                }
            });
            resolve(map);
        });
    });
}