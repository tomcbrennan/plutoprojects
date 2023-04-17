<?php

/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($composer_autoload)) {
	require_once $composer_autoload;
	$timber = new Timber\Timber();
}

include 'php/tiny-mce-extend.php';
if (file_exists(__DIR__ . '/ajax/ajax.php')) {
    include 'ajax/ajax.php';
}

/**
 * Setup our custom options page
 */
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
		'page_title' 	=> 'Site Settings',
		'menu_title'	=> 'Site Settings',
		'menu_slug' 	=> 'site-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if (!class_exists('Timber')) {

	add_action(
		'admin_notices',
		function () {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
		}
	);

	add_filter(
		'template_include',
		function ($template) {
			return get_stylesheet_directory() . '/static/no-timber.html';
		}
	);
	return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array('templates', 'views');

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;


/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class TomDotCom extends Timber\Site
{
	/** Add timber support. */
	public function __construct()
	{
		add_action('after_setup_theme', array($this, 'theme_supports'));
		add_filter('timber/context', array($this, 'add_to_context'));
		add_action('init', array($this, 'register_post_types'));
		add_action('init', array($this, 'register_taxonomies'));
        add_action('wp_enqueue_scripts', array($this, 'register_assets'));
		parent::__construct();
	}
	/** This is where you can register custom post types. */
	public function register_post_types()
	{
		register_post_type( 'products', array(
			'label'  => 'Products',
			'public' => true,
			'has_archive' => false,
			'supports' => array( 'title', 'thumbnail', 'editor'),
			'menu_icon' => 'dashicons-products',
		));

		register_post_type( 'projects', array(
			'label'  => 'Projects',
			'public' => true,
			'has_archive' => false,
			'supports' => array( 'title', 'thumbnail'),
			'menu_icon' => 'dashicons-open-folder',
		));
	}
	/** This is where you can register custom taxonomies. */
	public function register_taxonomies()
	{
		$args = array(
			'label'        => __( 'Categories', 'products' ),
			'hierarchical' => true,
		);
	  
		register_taxonomy( 'product-category', 'products', $args );
	}

    /** This is where you can register custom CSS & JS files. */
    public function register_assets()
    {
        wp_enqueue_style('TomDotCom', get_stylesheet_directory_uri() . '/static/style.css', false, filemtime(get_stylesheet_directory() . '/static/style.css'));
        wp_enqueue_script('TomDotCom', get_stylesheet_directory_uri() . '/static/site.js', false, filemtime(get_stylesheet_directory() . '/static/site.js') );

        // wp_enqueue_style('adobe-fonts', 'https://use.typekit.net/PASTE_PROJECT_ID_HERE.css');
    }

	/** This is where you add some context
	 *
	 * @param string $context context['this'] Being the Twig's {{ this }}.
	 */
	public function add_to_context($context)
	{
		if (function_exists('get_fields')) {
            $context['options'] = get_fields('options');
        }
        // Default menu
		$context['menu']  = new Timber\Menu();

        $context['products'] = Timber::get_posts([
            'post_type' => 'products',
            'post_status' => 'publish',
            'posts_per_page' => 10,
        ]);

        $context['all_products'] = Timber::get_posts([
            'post_type' => 'products',
            'post_status' => 'publish',
            'posts_per_page' => -1,
        ]);

		$current_post_id = get_the_ID();

        $context['related_products'] = Timber::get_posts([
            'post_type' => 'products',
            'post_status' => 'publish',
            'posts_per_page' => 4,
			'order' => 'RAND',
			'post__not_in' => [$current_post_id],
        ]);

        $context['benches'] = Timber::get_posts([
            'post_type' => 'products',
            'post_status' => 'publish',
			'posts_per_page' => -1,
			'order' => 'ASC',
			'tax_query' => array(
				array(
					'taxonomy' => 'product-category',
					'field'    => 'slug',
					'terms'    => 'bench-seats',
				),
			),
        ]);

        $context['pots'] = Timber::get_posts([
            'post_type' => 'products',
            'post_status' => 'publish',
			'posts_per_page' => -1,
			'order' => 'ASC',
			'tax_query' => array(
				array(
					'taxonomy' => 'product-category',
					'field'    => 'slug',
					'terms'    => 'pots',
				),
			),
        ]);

        $context['steps'] = Timber::get_posts([
            'post_type' => 'products',
            'post_status' => 'publish',
			'posts_per_page' => -1,
			'order' => 'ASC',
			'tax_query' => array(
				array(
					'taxonomy' => 'product-category',
					'field'    => 'slug',
					'terms'    => 'steps',
				),
			),
        ]);

        $context['decor'] = Timber::get_posts([
            'post_type' => 'products',
            'post_status' => 'publish',
			'posts_per_page' => -1,
			'order' => 'ASC',
			'tax_query' => array(
				array(
					'taxonomy' => 'product-category',
					'field'    => 'slug',
					'terms'    => 'decor',
				),
			),
        ]);

        $context['projects'] = Timber::get_posts([
            'post_type' => 'projects',
            'post_status' => 'publish',
            'posts_per_page' => 12,
        ]);



		$context['site']  = $this;

		return $context;
	}

	public function theme_supports()
	{
		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support('title-tag');

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support('post-thumbnails');

		add_theme_support('menus');
		/**
		 * Register our first menu
		 */
		register_nav_menus(
			array(
				'primary' => __('Primary Menu', 'TomDotCom'),
			)
		);

		add_theme_support('align-wide');
		add_theme_support('wp-block-styles');
		add_theme_support('editor-styles');
		add_editor_style('static/editor.css');
	}
	
}

// ADD CUSTOM FIELD VALUES FOR COLOURS, SIZES AND FINISHING CAPS TO DROPDOWNS INSIDE PRODUCTS

add_filter( 'gform_pre_render', 'populate_gravity_form_dropdowns' );
add_filter( 'gform_pre_validation', 'populate_gravity_form_dropdowns' );
add_filter( 'gform_pre_submission_filter', 'populate_gravity_form_dropdowns' );
add_filter( 'gform_admin_pre_render', 'populate_gravity_form_dropdowns' );


function populate_gravity_form_dropdowns( $form ) {

    if ( $form['id'] == 2 ) {
        $post_id = get_the_ID();

        $colours = get_field( 'colours', $post_id );
        $sizes = get_field( 'sizes', $post_id );
		$add_finishing_caps = get_field( 'add_finishing_caps', $post_id );
		$finishing_caps = get_field( 'finishing_caps', $post_id );
		$show_colour_chart = get_field( 'show_colour_chart', $post_id );

        $colour_choices = array();
		if ( is_array( $colours ) ) {
			foreach ( $colours as $colour ) {
				$colour_label = $colour['colour'];
				$colour_value = $colour['colour'];
				$colour_choices[] = array( 'text' => $colour_label, 'value' => $colour_value );
			}
		}

        $size_choices = array();
        if ( is_array( $sizes ) ) {
            foreach ( $sizes as $size ) {
                $size_label = $size['size'];
                $size_value = $size['size'];
                $size_choices[] = array( 'text' => $size_label, 'value' => $size_value );
            }
        }

		$finishing_cap_choices = array();
		if ( is_array( $finishing_caps ) ) {
			foreach ( $finishing_caps as $finishing_cap ) {
				$finishing_cap_label = $finishing_cap['finishing_cap'];
				$finishing_cap_value = $finishing_cap['finishing_cap'];
				$finishing_cap_choices[] = array( 'text' => $finishing_cap_label, 'value' => $finishing_cap_value );
			}
		}

		$form = populate_gravity_form_field_choices( $form, 9, $colour_choices );
		$form = populate_gravity_form_field_choices( $form, 10, $size_choices );

		if ( $add_finishing_caps == 'no' ) {
			foreach ( $form['fields'] as $key => $field ) {
				if ( $field->id == 18 ) {
					unset( $form['fields'][ $key ] );
				}
			}
		} else {
			$form = populate_gravity_form_field_choices( $form, 18, $finishing_cap_choices );
		}

		if ( $show_colour_chart == 'no' ) {

			foreach ( $form['fields'] as $key => $field ) {
				if ( $field->id == 11 ) {
					unset( $form['fields'][ $key ] );
				}
			}
		}

    }

    return $form;
}

function populate_gravity_form_field_choices( $form, $field_id, $choices ) {
    foreach ( $form['fields'] as &$field ) {
        if ( $field->id == $field_id ) {
            $field->choices = $choices;
        }
    }
    return $form;
}



new TomDotCom();
