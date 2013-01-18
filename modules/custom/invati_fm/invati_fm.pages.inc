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
    '#default_value' => variable_get('invati_fm_domain', NULL),
  );

  return system_settings_form($form);
}