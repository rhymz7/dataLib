<?php

/*
Plugin Name: TestPlugin
Plugin URI: https://mon-siteweb.com/
Description: Ceci est mon premier plugin
Author: HULK
Version: 1.0
Author URI: http://mon-siteweb.com/
*/

class TestPlugin {

    public function __construct()
    {        
        add_action('publish_voiture', array($this,'post_modified'), 10, 2);
        add_shortcode('test1', array($this, 'extractHtml'));
        add_action ('wp_enqueue_scripts', array($this, 'adding_styles'));
        add_action ('wp_enqueue_scripts', array($this, 'adding_scripts'));
    }

    // Appel de la méthode add_Text() uniquement à la modif ou création d'un post
    public function post_modified( $ID, $post ) {
        $this->add_Text();
    }

    public function extractHtml(){
        $file = file_get_contents(__DIR__ . '/index.html', true);
        $filecut = substr($file, strpos($file, '<section>'), -15);

        // $config sert de configuration à la place d'une ihm, ihm TODO
        $config = [
            "filters" => [
                ["source" => 'voitures', "filter" => 'Type'], 
                // ["source" => 'voitures', "filter" => 'marque']
            ],
            "columns" => [
                ["label" => "id", "source" => "__id"],
                ["label" => "Nom", "source" => "name",],
                ["label" => "Marque", "source" => "marque"],
                ["label" => "Etat", "source" => "etat"],
                ["label" => "Type", "source" => "Type"]
            ]
        ];
        // Parcours du tableau filters, pour créer une chaine de caractères à insérer dans le html qui représentera les filtres configurés
        $filters = null;
        $id_filters = null;
        foreach ($config['filters'] as $key => $value) {
            $filters = $filters.'<h4>'.$value['filter'].'</h4>
            <div id="id-checkbox'.$key.'" data-source'.$key.'="'.$value['source'].'" data-filter'.$key.'="'.$value['filter'].'">    
                <ul>
                </ul>
            </div>
            <hr></hr>';
            $id_filters[] = '#id-checkbox'.$key;
        }
        $string_id_filters = '"'.implode('","', $id_filters).'"';
        // Parcours du tableau columns, pour créer une chaine de caractères à insérer dans le html qui représentera les colonnes configurés
        $columns = null;
        foreach ($config['columns'] as $key => $value) {
            // var_dump($value["label"] . " and " . $value["source"]);
            $columns = $columns.'<th data-source='.$value["source"].' >'.$value["label"].'</th>';
        };
        // On remplace les mots clés "filters", "columns" dans le html par les chaines de caractères définies ci-dessus
        $replace = str_replace(
            [
                "{filters}",
                "{columns}",
                "{ff}",
                "{mapid}",
                "{listenerid}",
                "{tableid}",
                "{map-popup-template-id}"
            ], 
            [
                $filters,
                $columns,
                $string_id_filters,
                "mapid",
                "#listener",
                "#example",
                '#map-popup-template'
            ], 
            $filecut
        );
        echo $replace;
    }
    
    public function add_Text() 
    {
    $__id = 0;
    $tableau_pour_json = [];
    echo "<p style='color: red;'>TEST</p>";
    $args = array(
        'post_type' => 'voiture'
    );
    $the_query = new WP_Query( $args );
        if ( $the_query->have_posts() ) {
            while ( $the_query->have_posts() ) {
                $the_query->the_post();

                $tableau_pour_json['voitures'][] = [
                    '__id'   => $__id,
                    'post_id'     => get_the_ID(),
                    'name'   => get_the_title(), 
                    'latlon' => [get_post_meta( get_the_ID(), 'lat', true ),get_post_meta( get_the_ID(), 'lng', true )], 
                    'marque' => get_post_meta( get_the_ID(), 'marque', true ),
                    'etat'   => get_post_meta( get_the_ID(), 'etat', true ),
                    'Type'   => get_post_meta( get_the_ID(), 'cat', true ),
                    'link'   => get_permalink( $_post->ID ),
                    'media'  => get_the_post_thumbnail_url(get_the_ID(), array('150' , '150'))
                ];
                $__id++;
            }
            $contenu_json = json_encode($tableau_pour_json); 
            // Ouverture du fichier
            $fichier = fopen(__DIR__.'/data/data.json', 'w+');
            // Ecriture dans le fichier
            fwrite($fichier, $contenu_json);
            // Fermeture du fichier
            fclose($fichier);
            wp_reset_postdata();
        } else {
            echo "<p style='color: red;'>no posts found</p>";
        }
    }

    public function adding_styles(){
        //CSS
        wp_register_style ('bootstrap', "/wp-content/plugins/TestPlugin/vendor/bootstrap/css/bootstrap.min.css");
        wp_enqueue_style ('bootstrap');
        wp_register_style ('fontawesome', "/wp-content/plugins/TestPlugin/vendor/font-awesome/css/font-awesome.min.css");
        wp_enqueue_style ('fontawesome');
        wp_register_style ('leafletcss', "/wp-content/plugins/TestPlugin/vendor/leaflet/leaflet.css");
        wp_enqueue_style ('leafletcss');
        wp_register_style ('markerclustercss', "/wp-content/plugins/TestPlugin/vendor/Leaflet.markercluster/dist/MarkerCluster.css");
        wp_enqueue_style ('markerclustercss');
        wp_register_style ('leafletlabelcss', "/wp-content/plugins/TestPlugin/vendor/Leaflet.label/dist/leaflet.label.css");
        wp_enqueue_style ('leafletlabelcss');
        wp_register_style ('datatablecss', "/wp-content/plugins/TestPlugin/vendor/DataTables/datatables.min.css");
        wp_enqueue_style ('datatablecss');
        wp_register_style ('uicss', "/wp-content/plugins/TestPlugin/assets/css/ui.css");
        wp_enqueue_style ('uicss');

    }
    public function adding_scripts () {
        //JS
        wp_enqueue_script ('jquery');

        wp_register_script ('datatables', "/wp-content/plugins/TestPlugin/vendor/DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js", array ('jquery'), NULL, true);
        wp_enqueue_script ('datatables');

        wp_register_script ('leaflet', "/wp-content/plugins/TestPlugin/vendor/leaflet/leaflet.js", array ('jquery'), NULL, true);
        wp_enqueue_script ('leaflet');
        wp_register_script ('leafletlabel', "/wp-content/plugins/TestPlugin/vendor/Leaflet.label/dist/leaflet.label.js", array ('jquery'), NULL, true);
        wp_enqueue_script ('leafletlabel');
        wp_register_script ('leafletcluster', "/wp-content/plugins/TestPlugin/vendor/Leaflet.markercluster/dist/leaflet.markercluster.js", array ('jquery'), NULL, true);
        wp_enqueue_script ('leafletcluster');
        
        wp_register_script ('DataView', "/wp-content/plugins/TestPlugin/lib/DataView.js", array ('jquery'), NULL, true);
        wp_enqueue_script ('DataView');

        wp_register_script ('listener', "/wp-content/plugins/TestPlugin/lib/Listener.js", array ('jquery'), NULL, true);
        wp_enqueue_script ('listener');

        wp_register_script ('filter', "/wp-content/plugins/TestPlugin/lib/Filter.js", array ('jquery'), NULL, true);
        wp_enqueue_script ('filter');

        wp_register_script ('tableview', "/wp-content/plugins/TestPlugin/lib/TableView.js", array ('jquery'), NULL, true);
        wp_enqueue_script ('tableview');

        wp_register_script ('mapview', "/wp-content/plugins/TestPlugin/lib/MapView.js", array ('jquery'), NULL, true);
        wp_enqueue_script ('mapview');
    }
    
}

$testPlugin = new TestPlugin();

