<?php
/**
 * @file
 * Default theme implementation to provide an HTML container for a mobile Community Newsfeed block.
 *
 * @ingroup themeable
 */

?>
<div id="fm-filters"><span id="filter-updates"><?php print t('Updates'); ?></span><span id="filter-images"><?php print t('Images'); ?></span><span id="filter-video"><?php print t('Video'); ?></span></div>
<div id="fm-output-all"></div>
<div id="fm-output-updates"></div>
<div id="fm-output-images"></div>
<div id="fm-output-video"></div>
<div id="load-more" class="more-button"><?php print t('LOAD MORE'); ?></div>