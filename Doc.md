Requirements :
Configuration :

- Filter :
Dans le <div id="filter">, insérer autant de filtres que nécessaire, sous cette forme :
    <h4>Type</h4>
    <div id="id_checkbox1" data-source="voitures" data-filter="Type">    
    <form>
    </form>
    </div>
    <hr></hr>
le <h4> correspondant au filtre choisi;
<div id="id_checkbox1" data-source="voitures" data-filter="Type">  
Ici il faut incrémenter "id_checkbox1" selon le nombre de filtres;
data-source est la source à aller chercher;
data-filter est le paramètre qui sera utilisé comme filtre;
    
- Table :
Configuration des colonnes dans la balise <tr>, sous cette forme : <th data-source="__id" >id</th>
Le data-source correspondant au paramètre faisant référence.
Indiquer autant de <th> que nécessaire.

- Popup : 
à configurer sous cette forme :  <h3 data-source="name">nom du modèle</h3>
data-source est la référence à aller chercher;
possible également sous cette forme :  <a data-source="link=href">Détails</a>
ce qui permet d'ajouter un attribut à la balise, ici l'attribut 'href', qui va chercher 'link' comme référence.
Il est possible de mettre autant d'attributs que nécessaire, séparés par ','

- script :
Configuration des ids;

