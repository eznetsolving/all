<?php

/**
 * @file
 * FeedMagnet admin page callaback functions.
 */

 /**
 * FeedMagnet settings form.
 */
function invati_fm_admin_form($form, &$form_state) {
  $form['invati_fm_domain'] = array(
    '#type' => 'textfield',
    '#title' => t('FeedMagnet domain'),
    '#default_value' => variable_get('invati_fm_domain','invati.feedmagnet.com'),
    '#description' => t('Domain name where FeedMagnet feeds are located.'),
  );
  
  $form['invati_fm_posts_limit'] = array(
    '#type' => 'textfield',
    '#title' => t('FeedMagnet: Community Newsfeed posts limit'),
    '#default_value' => variable_get('invati_fm_posts_limit', 7),
    '#description' => t('Number of posts on the Community Newsfeed block'),
  );
  
  $form['invati_fm_teaser_posts_limit'] = array(
    '#type' => 'textfield',
    '#title' => t('FeedMagnet: Community Newsfeed teaser posts limit'),
    '#default_value' => variable_get('invati_fm_teaser_posts_limit', 3),
    '#description' => t('Number of posts on the Community Newsfeed teaser block'),
  );

  return system_settings_form($form);
}