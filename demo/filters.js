
initFilters = (configuration, map, offices) => {
    return new Promise(function (resolve, reject) {
        let ndx = crossfilter(offices.features)
        const charts = [];
        let dimension;
        configuration.filter((c) => c.chart).forEach((c) => {
            let chart = dc.barChart(`#${c.chart}`, "all");


            dimension = ndx.dimension(function (d) { return Math.round(d.properties[c.dimension]); });
            let groupCount = dimension.group();

            chart
                .height(100)
                .width(400)
                .margins({ top: 10, right: 20, bottom: 22, left: 20 })
                .dimension(dimension)
                .group(groupCount)
                .transitionDuration(500)
                .centerBar(true)
                .colors(c.chartColors)
                .colorAccessor(function (d) { return d.key })
                .x(c.chartDomain)
                .elasticY(true)
                .xUnits(() => c.chartUnits)
                .xAxis().ticks(10)
            chart.render();
            charts.push(chart);

        });

        const apply_filters = () => {
            let filtered = dimension.top(Infinity);
            map.getSource("offices").setData({ type: 'FeatureCollection', features: filtered });
            map.getSource("offices-points").setData({ type: 'FeatureCollection', features: filtered.map((f) => { return { type: 'Feature', geometry: f.properties.center, properties: { office: f.properties.office } } }) });


            var tbody = d3.select("#table").select("tbody");
            var tr = tbody.selectAll("tr").data(filtered.sort((a, b) => a.score - b.score).slice(0, 10), (d) => d.properties.office);
            tr.exit().remove();
            var tr = tr.enter().append("tr");
            tr.append('td').html(function (d) { return d.properties.office; });
            tr.append('td').html(function (d) { return d.properties.company; });
            tr.append('td').html(function (d) { return d.properties.revenue; });
            tr.append('td').html(function (d) { return d.properties.cost; });
            tr.append('td').html(function (d) { return d.properties.numOffices; });
            tr.append('td').html(function (d) { return d.properties.nearby; });
            tr.append('td').html(function (d) { return d.properties.sustainability; });
            tr.append('td').html(function (d) { return d.properties.equality; });
            tr.append('td').html(function (d) { return Math.round(d.properties.score); });
        }
        charts.forEach((chart) => chart.on("filtered", apply_filters));
        apply_filters();

    });

}