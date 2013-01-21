<?php
/**
 * @file
 * Gathers all the theme functions
 */


/**
 * Process variables for invati-fm-community-newsfeed-mobile.tpl.php.
 *
 * @see invati-fm-community-newsfeed-mobile.tpl.php
 */
function template_preprocess_invati_fm_community_newsfeed_mobile(&$variables) {
  $path = drupal_get_path('module', 'invati_fm');
  drupal_add_js(array('pathToModule' => $path), 'setting');
  drupal_add_js(array('postsLimit' => variable_get('invati_fm_posts_limit', 7)), 'setting');
  drupal_add_js(array('fmDomain' => variable_get('invati_fm_domain','invati.feedmagnet.com')), 'setting');  
  drupal_add_js(drupal_get_path('module', 'invati_fm') . '/invati_fm.js');
}

/**
 * Process variables for invati-fm-community-newsfeed-teaser-mobile.tpl.php.
 *
 * @see invati-fm-community-newsfeed-teaser-mobile.tpl.php
 */
function template_preprocess_invati_fm_community_newsfeed_teaser_mobile(&$variables) {
  $path = drupal_get_path('module', 'invati_fm');
  drupal_add_js(array('pathToModule' => $path), 'setting');
  drupal_add_js(array('postsLimit' => variable_get('invati_fm_teaser_posts_limit', 3)), 'setting');
  drupal_add_js(array('fmDomain' => variable_get('invati_fm_domain','invati.feedmagnet.com')), 'setting');  
  drupal_add_js(drupal_get_path('module', 'invati_fm') . '/invati_fm.js');
}

/**
 * Process variables for invati-fm-community-newsfeed-pc.tpl.php.
 *
 * @see invati-fm-community-newsfeed-pc.tpl.php
 */
function template_preprocess_invati_fm_community_newsfeed_pc(&$variables) {
  $path = drupal_get_path('module', 'invati_fm');
  drupal_add_js(array('pathToModule' => $path), 'setting');
  drupal_add_js(array('postsLimit' => variable_get('invati_fm_posts_limit', 7)), 'setting');
  drupal_add_js(array('fmDomain' => variable_get('invati_fm_domain','invati.feedmagnet.com')), 'setting');  
  drupal_add_js(drupal_get_path('module', 'invati_fm') . '/invati_fm.js');
}