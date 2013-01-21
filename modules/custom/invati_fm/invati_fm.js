(function ($) {

// This is just a function that receives the json (data) of an update from FeedMagnet
// and returns a string of HTML to be displayed

jsonToHTML = function(update, _) {

    // use @usernames for Twitter users
    if (update.channel == 'twitter') update.author.alias = update.author.token;
    
    var media_width = 380;
    var type;
    
    // reusable stuff
    var timestamp = '<span class="fm-timestamp" data-timestamp="' + update.timestamp + '">' + _(update.timestamp).pretty_time() + '</span>';
    var via = 'via ' + update.channel;
    //var channel_icon = '<img class="channel ' + update.channel + '" src="' + Drupal.settings.pathToModule + '/img/' + update.channel + '.png" />';
    var channel_icon = update.channel;


    // checkins with text
    if (update.classification == 'checkin' && update.text) {
        html =  '<div class="item-block update">';
        html +=     '<div class="item-content"><span class="comment">' + update.text + '</span></div>';
        html +=     '<div class="item-footer">';
        html +=        '<div class="avatar"><img src="' + update.author.avatar + '" alt="' + update.author.token + ' avatar" /><span class="name">' + update.author.alias + '</span><span class="info">' + timestamp + ' via ' + channel_icon + '</span></div>';
        html +=     '</div>';
        html += '</div>';
        return html;
    }

    // checkins
    if (update.classification == 'checkin') {
        html =  '<div class="item-block update">';
        html +=     '<div class="item-content"><span class="comment">' + update.text + '</span></div>';
        html +=     '<div class="item-footer">';
        html +=        '<div class="avatar"><img src="' + update.author.avatar + '" alt="' + update.author.token + ' avatar" /><span class="name">' + update.author.alias + '</span><span class="info">' + timestamp + ' via ' + channel_icon + '</span></div>';
        html +=     '</div>';
        html += '</div>';
        return html;
    }
    
    // photo updates
    if (update.classification in {'photo':1, 'photoblurb':1}) {
        html =  '<div class="item-block photo-block update">';
        html +=     '<div class="item-content"><img class="featured-photo" src="' + update.photos[0].local_url + media_width + '/' + (media_width - 30) + '/exact" /></div>';
        html +=     '<div class="item-footer">';
        html +=        '<div class="avatar"><img src="' + update.author.avatar + '" alt="' + update.author.token + ' avatar" /><span class="name">' + update.author.alias + '</span><span class="info">' + timestamp + ' via ' + channel_icon + '</span></div>';
        html +=     '</div>';
        html += '</div>';
        return html;
    }
    
    // video updates
    if (update.classification in {'video':1, 'videoblurb':1}) {
        var video = update.videos[0];
        // add autoplay false and wmode to the video embed code
        var code = video.code;
        var ins_point = false;
        if (video.origin == 'vimeo') ins_point = code.indexOf('" width=');
        if (video.origin == 'youtube') ins_point = code.indexOf('" frameborder=');
        if (ins_point) code = code.substr(0, ins_point) + '?autoplay=0&wmode=transparent' + code.substr(ins_point);
        html =  '<div class="item-block video-block update">';
        html +=     '<div class="item-content"><span class="embed">' + code + '</span></div>';
        html +=     '<div class="item-footer">';
        html +=        '<div class="avatar"><img src="' + update.author.avatar + '" alt="' + update.author.token + ' avatar" /><span class="name">' + update.author.alias + '</span><span class="info">' + timestamp + ' via ' + channel_icon + '</span></div>';
        html +=     '</div>';
        html += '</div>';
        return html;        
    }
    
        // fallback for everything else
    html =  '<div class="item-block generic-block update">';
    html +=     '<div class="item-content"><span class="comment">' + update.text + '</span></div>';
    html +=     '<div class="item-footer">';
    html +=        '<div class="avatar"><img src="' + update.author.avatar + '" alt="' + update.author.token + ' avatar" /><span class="name">' + update.author.alias + '</span><span class="info">' + timestamp + ' via ' + channel_icon + '</span></div>';
    html +=     '</div>';
    html += '</div>';
    return html;
};

Drupal.behaviors.feedMagnet = {
  attach: function (context, settings) {


      // define a custom ready function that will patiently wait until feedmagnet is available
      window.fm_ready = function(fx) {
          if (typeof $FM !== 'undefined' && typeof $FM.ready === 'function') { $FM.ready(fx); }
          else { window.setTimeout(function() { window.fm_ready.call(null, fx); }, 50); }
      };

      // load in feedmagnet
      var domain = Drupal.settings.fmDomain;
      var fmjs = document.createElement('script');
      fmjs.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + domain + '/embed.js';
      fmjs.setAttribute('async', 'true'); document.documentElement.getElementsByTagName('head')[0].appendChild(fmjs); 
      
      window.fm_ready(function($, _) {
          // Instantiate feed object for the group 'all'
          var feed = $FM.Feed('all').options({
              'limit': Drupal.settings.postsLimit,
          });        
                             
          // create element for each group
          var el_all = $FM.Element('#fm-output-all');
          var el_updates = $FM.Element('#fm-output-updates');
          var el_images = $FM.Element('#fm-output-images');
          var el_video = $FM.Element('#fm-output-video');
          
          // function to hide all elements and display only the one that's passed through the arg
          function showOnly(arg) {
            el_all.hide();
            el_updates.hide();
            el_images.hide();
            el_video.hide();
            arg.show();
          }
          
          // function to display specified group
          function displayGroup(group, element) {
            feed = $FM.Feed(group).options({
              'limit': Drupal.settings.postsLimit,
            });
            feed.connect('new_update', function(sender, data) {
              var update = data.update;
              update.html = jsonToHTML(data.update.data, _);
            }); 
            element.display(feed);
            showOnly(element);
            feed.get();        
          }
          
          displayGroup('all', el_all);
          
          $('#see-more').click(function() {
            window.location = '/community-posts';
          });
          
          $('#load-more').click(function() {
            feed.more();
          });
          $('#filter-updates').click(function(e) {
            displayGroup('updates', el_updates);
          });
          $('#filter-images').click(function(e) {
            displayGroup('images', el_images);
          });
          $('#filter-video').click(function(e) {
            displayGroup('video', el_video);
          });
      });    
  }
}

})(jQuery);