/**
 * Filter.js
 * Permet de filtrer pour l'affichage des données
 */

class Filter {

    constructor( data, arrayDiv ) {
        this.arrayDiv = arrayDiv;
        this.data = data ;
        this.makeFilters();
        this.makeFilter();
        this.filters;
    }

    makeFilter() {
        var self = this;
        // arrayDiv récupère toutes les div afin d'afficher les filtres
        this.arrayDiv.forEach(function(elt, index){
            var div = jQuery( elt ).children();
            var filter = jQuery( elt ).data('filter');
            self.filters[index].values.forEach(function(elt, i){
                //index => niv1 du filters (ex: Types)
                //i => niv2 du filters (ex: 4X4)
                //index et i passés en paramètres afin de pouvoir les traiter et s'en servir pour recup les ids à add ou remove
                    div.append(
                        "<li><input id='"+index+"_"+i+"' onclick=dataview.selected('"+index+"_"+i+"') type=checkbox class=choix /> " + elt.label + "</li><br>"
                        );  
                })
        })
    }

    makeFilters() {
        var self = this;
        var filters = []

        //Boucle sur chaque div qui représente un filtre, puis ajout de chaq filtre dans filters
        this.arrayDiv.forEach(function(elt, index){
            var filter = jQuery( elt ).data('filter');
            var source = jQuery( elt ).data('source');
            var items = self.data[source];
            var arraybis = [];
            var arrayFilter = [];
            for (let i = 0; i < items.length; i++) {
                if ( arraybis.includes(items[i][filter])) {

                } else {
                    arraybis.push(items[i][filter]
                        );
                }
            }  
            arraybis.forEach(function(elt){
                arrayFilter.push({
                    label:elt,
                    ids:[]
                    }
                );
            });
                    
            items.forEach(function(item, i){
                arrayFilter.forEach(function(cat, index){
                    if ( item[filter] == cat.label) {
                        arrayFilter[index].ids.push(item.__id);
                    }
                })
            })
            filters.push({
                label:filter,
                values:arrayFilter
            });
        })
        this.filters = filters;
        console.log(this.filters);
    }  

}