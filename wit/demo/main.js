runWorkShop = async () => {
    try {
        const map = await initMap();
        const offices = await d3.json(`${baseUrl}data/offices.json`);
        
        offices.features.forEach((o) => o.properties.score = scoreFunction(o))

        const configuration = [
            {
                id: 'heatmap',
                layers: ['hue', 'points'],
                button: 'heatmap',
                description: "Each marker on the map is a company office."
            },
            {
                id: 'revenue',
                layers: ['revenue'],
                button: 'revenue',
                description: "Each bar on the map is a company office. The height and color of the bars show the revenue of its parent company.",
                chart: 'revenue-chart',
                dimension: 'revenue',
                chartColors: d3.scaleLinear().domain([0, 100, 200, 1000]).range(["yellow", "orange", "green", "greenyellow"]),
                chartDomain: d3.scaleLinear().domain([0, 1000]),
                chartUnits: 100
            },
            {
                id: 'cost',
                layers: ['cost'],
                button: 'cost',
                description: "Each bar on the map is a company office. The height and color of the bars show what the connection cost to the nearest site is.",
                chart: 'cost-chart',
                dimension: 'cost',
                chartColors: d3.scaleLinear().domain([0, 100, 250, 500]).range(["green", "yellow", "red", "red"]),
                chartDomain: d3.scaleLinear().domain([0, 500]),
                chartUnits: 500
            },
            {
                id: 'num-offices',
                layers: ['numOffices'],
                button: 'num-offices',
                description: "Each bar on the map is a company office. The height and color of the bars show how mny total offices its parent company has.",
                chart: 'num-offices-chart',
                dimension: 'numOffices',
                chartColors: d3.scaleLinear().domain([0, 25, 50]).range(["yellow", "green", "greenyellow"]),
                chartDomain: d3.scaleLinear().domain([0, 50]),
                chartUnits: 50
            },
            {
                id: 'nearbyOffices',
                layers: ['nearbyOffices'],
                button: 'nearby-offices',
                description: "Each bar on the map is a company office. The height and color of the bars show how many other offices are located within 1km of the office.",
                chart: 'nearby-offices-chart',
                dimension: 'nearby',
                chartColors: d3.scaleLinear().domain([0, 10, 50]).range(["yellow", "green", "greenyellow"]),
                chartDomain: d3.scaleLinear().domain([0, 50]),
                chartUnits: 50
            },
            {
                id: 'sustainability',
                layers: ['sustainability'],
                button: 'sustainability',
                description: "Each bar on the map is a company office. The height and color of the bars show how well the parent company score on sustainability.",
                chart: 'sustainability-chart',
                dimension: 'sustainability',
                chartColors: d3.scaleLinear().domain([0, 20, 80, 100]).range(["red", "orange", "yellow", "green"]),
                chartDomain: d3.scaleLinear().domain([0, 100]),
                chartUnits: 100
            },
            {
                id: 'equality',
                layers: ['equality'],
                button: 'equality',
                description: "Each bar on the map is a company office. The height and color of the bars show how well the parent company score on equality.",
                chart: 'equality-chart',
                dimension: 'equality',
                chartColors: d3.scaleLinear().domain([0, 25, 50, 75, 100]).range(["red", "orange", "yellow", "green", "greenyellow"]),
                chartDomain: d3.scaleLinear().domain([0, 100]),
                chartUnits: 100
            },
            {
                id: 'score',
                layers: ['score'],
                button: 'score',
                description: "Each bar on the map is a company office. The height and color of the bars show the total Tele2 prospect for the office.",
                chart: 'score-chart',
                dimension: 'score',
                chartColors: d3.scaleLinear().domain([0, 50, 100]).range(["rgba(249,69,219,0.4)", "rgba(249,69,219,0.6)", "rgba(249,69,219,1)"]),
                chartDomain: d3.scaleLinear().domain([0, 100]),
                chartUnits: 100
            }
        ]
        
        configuration.forEach((c) => {
            document
                .getElementById(c.button)
                .addEventListener('click', function () {
                    configuration.map((c2) => c2.layers).flat().forEach((l) => map.setLayoutProperty(l, 'visibility', 'none'));
                    c.layers.forEach((l) => map.setLayoutProperty(l, 'visibility', 'visible'));
                    d3.select(".active").classed("active", false);
                    d3.select(`#${c.button}`).classed("active", true);
                    d3.select("#description").text(c.description);
                });
        });

        await initFilters(configuration, map, offices);

    } catch (e) {
        console.log(e)
    }
}