 Promise.all([ // load multiple files
        d3.json('world-110m.json'),d3.csv('IHME_GBD_2010_MORTALITY_AGE_SPECIFIC_BY_COUNTRY_1970_2010 (1).csv',d3.autoType)])
        .then(([map, countries])=>{ // or use destructuring :([airports, wordmap])=>{ ... 

        const features = topojson.feature(map, map.objects.countries).features;
        console.log('features', features);
        console.log('countries', countries);

        const width = 630;
        const height = 400;

        const projection = d3.geoMercator()
            .fitExtent([[0,0], [width, height]],
            topojson.feature(worldmap, worldmap.objects.countries));
        
        const path = d3.geoPath()
            .projection(projection);

        const svg = d3.select('body').append('svg')
            .attr('viewBox', [0,0,width,height]);

        svg.selectAll('path')
            .data(features)
            .join('path')
            .attr('d', path);
                
        svg.append('path')
            .datum(topojson.mesh(map, map.objects.countries))
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-linejoin', 'round');  

    });
