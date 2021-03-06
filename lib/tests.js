// Generated by CoffeeScript 1.9.1
(function() {
  var CND, H, alert, badge, debug, echo, handle, help, info, log, rpr, settings, test, urge, warn, whisper;

  CND = require('cnd');

  rpr = CND.rpr.bind(CND);

  badge = 'HOTMETAL/tests';

  log = CND.get_logger('plain', badge);

  info = CND.get_logger('info', badge);

  whisper = CND.get_logger('whisper', badge);

  alert = CND.get_logger('alert', badge);

  debug = CND.get_logger('debug', badge);

  warn = CND.get_logger('warn', badge);

  help = CND.get_logger('help', badge);

  urge = CND.get_logger('urge', badge);

  echo = CND.echo.bind(CND);

  test = require('guy-test');

  H = require('..');

  handle = function(handler) {
    return function(error, result) {
      if (error != null) {
        throw error;
      }
      return handler(result);
    };
  };

  this["Dependency availability"] = function(T, done) {
    debug('©OKWgO', H.HTML);
    debug('©f65gK', H.HYPHENATOR);
    debug('©yEocf', H.LINEBREAKER);
    debug('©7YePi', H.MARKDOWN);
    debug('©2NQwg', H.TYPO);
    return done();
  };

  this["Object creation"] = function(T, done) {
    var chunk, close_tags, open_tags, ref;
    T.eq(H._new_hotml(), []);
    ref = chunk = H._new_chunk(), open_tags = ref[0], test = ref[1], close_tags = ref[2];
    T.eq(chunk, [[], '', []]);
    return done();
  };

  this["Object building 1"] = function(T, done) {
    var h;
    h = H._new_hotml();
    H.add(h, 'open-tag', 'div', {
      "class": 'foo bar'
    });
    H.add(h, 'open-tag', 'i', {});
    H.add(h, 'text', 'helo ');
    H.add(h, 'text', 'world!');
    H.add(h, 'close-tag', 'i');
    H.add(h, 'close-tag', 'div');
    T.eq(H.as_html(h), "<div class=\"foo bar\"><i>helo world!</i></div>");
    T.eq(h, [
      [
        [
          [
            "div", {
              "class": "foo bar"
            }
          ], ["i", {}]
        ], "helo ", []
      ], [[], "world!", ["i", "div"]]
    ]);
    return done();
  };

  this["Object building 2"] = function(T, done) {
    var h;
    h = H._new_hotml();
    H.add(h, 'open-tag', 'div', {
      "class": 'foo bar'
    });
    H.add(h, 'text', 'helo ');
    H.add(h, 'lone-tag', 'img', {
      src: 'http:/example.com/y.jpg',
      "class": 'myimg'
    });
    H.add(h, 'open-tag', 'em', {});
    H.add(h, 'text', 'beautiful ');
    H.add(h, 'close-tag', 'em');
    H.add(h, 'close-tag', 'div');
    T.eq(H.as_html(h), "<div class=\"foo bar\">helo <img class=\"myimg\" src=\"http:/example.com/y.jpg\"><em>beautiful</em></div>");
    return done();
  };

  this["is-wrapped 1"] = function(T, done) {
    var h;
    h = H._new_hotml();
    H.add(h, 'open-tag', 'div', {
      "class": 'foo bar'
    });
    H.add(h, 'text', 'helo ');
    H.add(h, 'lone-tag', 'img', {
      src: 'http:/example.com/y.jpg',
      "class": 'myimg'
    });
    H.add(h, 'open-tag', 'em', {});
    H.add(h, 'text', 'beautiful ');
    H.add(h, 'close-tag', 'em');
    H.add(h, 'close-tag', 'div');
    T.eq(H.is_wrapped(h), true);
    return done();
  };

  this["is-wrapped 2"] = function(T, done) {
    var h;
    h = H._new_hotml();
    H.add(h, 'text', 'helo ');
    H.add(h, 'lone-tag', 'img', {
      src: 'http:/example.com/y.jpg',
      "class": 'myimg'
    });
    H.add(h, 'open-tag', 'em', {});
    H.add(h, 'text', 'beautiful ');
    H.add(h, 'close-tag', 'em');
    T.eq(H.is_wrapped(h), false);
    return done();
  };

  this["unwrapping 1"] = function(T, done) {
    var h;
    h = H._new_hotml();
    H.add(h, 'open-tag', 'div', {
      "class": 'foo bar'
    });
    H.add(h, 'text', 'helo ');
    H.add(h, 'lone-tag', 'img', {
      src: 'http:/example.com/y.jpg',
      "class": 'myimg'
    });
    H.add(h, 'open-tag', 'em', {});
    H.add(h, 'text', 'beautiful ');
    H.add(h, 'close-tag', 'em');
    H.add(h, 'close-tag', 'div');
    H.unwrap(h);
    T.eq(H.as_html(h), "helo <img class=\"myimg\" src=\"http:/example.com/y.jpg\"><em>beautiful</em>");
    return done();
  };

  this["unwrapping 2"] = function(T, done) {
    var h;
    h = H._new_hotml();
    H.add(h, 'text', 'helo ');
    H.add(h, 'lone-tag', 'img', {
      src: 'http:/example.com/y.jpg',
      "class": 'myimg'
    });
    H.add(h, 'open-tag', 'em', {});
    H.add(h, 'text', 'beautiful ');
    H.add(h, 'close-tag', 'em');
    H.unwrap(h, true);
    T.eq(H.as_html(h), "helo <img class=\"myimg\" src=\"http:/example.com/y.jpg\"><em>beautiful</em>");
    return done();
  };

  this["Parsing 1"] = function(T, done) {
    var hotml, html;
    html = "foo bar baz";
    hotml = H.HTML.parse(html);
    T.eq(html, H.as_html(hotml));
    return done();
  };

  this["Parsing 2"] = function(T, done) {
    var hotml, html;
    html = "foo <b>bar</b> baz";
    hotml = H.HTML.parse(html);
    T.eq(html, H.as_html(hotml));
    return done();
  };

  this["Parsing 3"] = function(T, done) {
    var hotml, html;
    html = "foo <b>bar awesome</b> baz";
    hotml = H.HTML.parse(html);
    T.eq(html, H.as_html(hotml));
    return done();
  };

  this["Parsing 4"] = function(T, done) {
    var hotml, html, match;
    html = "foo <img src=\"x.jpg\"> <b>bar awesome</b> baz";
    match = [[[], "foo ", []], [[], "<img src=\"x.jpg\">", []], [[], " ", []], [["<b>"], "bar ", []], [[], "awe­", []], [[], "some", ["</b>"]], [[], " baz", []]];
    hotml = H.HTML.parse(html);
    T.eq(html, H.as_html(hotml));
    return done();
  };

  this["Parsing 5"] = function(T, done) {
    var hotml, html;
    html = "<p>foo <img src=\"x.jpg\"> <b>bar awesome</b> baz</p>";
    hotml = H.HTML.parse(html);
    T.eq(html, H.as_html(hotml));
    return done();
  };

  this["Parsing 6"] = function(T, done) {
    var hotml, html;
    html = "<p><i><span class=\"special\">foo</span></i><wrap><img src=\"x.jpg\"></wrap><b>bar awesome</b> baz</p>";
    hotml = H.HTML.parse(html);
    T.eq(html, H.as_html(hotml));
    return done();
  };

  this["Parsing 7"] = function(T, done) {
    var hotml, html;
    html = html = "Lo <div id=\"mydiv\"><em><i>arcade &amp; &#x4e00; illustration <img src=\"x.jpg\">\n<b>bromance</b> cyberspace <span class=\"foo\"></span> necessarily</i></em> completely.</div>";
    hotml = H.HTML.parse(html);
    T.eq(H.as_html(hotml), 'Lo <div id="mydiv"><em><i>arcade &amp; 一 illustration <img src="x.jpg"> <b>bromance</b> cyberspace <span class="foo"></span> necessarily</i></em> completely.</div>');
    return done();
  };

  this["`H.slice h`, `H.slice h, 0, h.length` return deep copies of `h`"] = function(T, done) {
    var _, close_tags_0, hotml, html, i, idx, len, open_tags_0, ref, slice_0, slice_1;
    html = "<p>foo <img src=\"x.jpg\"> <b>bar awesome</b> baz</p>";
    hotml = H.HTML.parse(html);
    T.eq((slice_0 = H.slice(hotml)), hotml);
    T.eq((slice_1 = H.slice(hotml, 0, hotml.length)), hotml);
    T.ok(slice_0 !== hotml);
    T.ok(slice_1 !== hotml);
    T.ok(slice_0 !== slice_1);
    T.ok(slice_1 !== hotml);
    for (idx = i = 0, len = slice_0.length; i < len; idx = ++i) {
      ref = slice_0[idx], open_tags_0 = ref[0], _ = ref[1], close_tags_0 = ref[2];
      T.ok(open_tags_0 !== slice_1[idx][0]);
      T.ok(close_tags_0 !== slice_1[idx][2]);
    }
    return done();
  };

  this["`H.slice` accepts negative and too big limits"] = function(T, done) {
    var hotml, html, slice;
    html = "<p>foo <img src=\"x.jpg\"> <b>bar awesome</b> baz</p>";
    hotml = H.HTML.parse(html);
    slice = H.slice(hotml, -100, Infinity);
    T.eq(slice, hotml);
    return done();
  };

  this["`H.slice` returns empty list if `start` gte `stop`"] = function(T, done) {
    var hotml, html, slice_0, slice_1;
    html = "<p>foo <img src=\"x.jpg\"> <b>bar awesome</b> baz</p>";
    hotml = H.HTML.parse(html);
    slice_0 = H.slice(hotml, 0, 0);
    slice_1 = H.slice(hotml, 5, 4);
    T.eq(slice_0, []);
    T.eq(slice_1, []);
    T.ok(slice_0 !== slice_1);
    return done();
  };

  this["`H.slice` returns list of length 1 if `start + 1` is `stop`"] = function(T, done) {
    var hotml, html, match, slice;
    html = "<p>foo <img src=\"x.jpg\"> <b>bar awesome</b> baz</p>";
    match = "<p>foo</p>";
    hotml = H.HTML.parse(html);
    slice = H.slice(hotml, 0, 1);
    T.eq(slice, [[[["p", {}]], "foo ", ["p"]]]);
    T.eq(H.as_html(slice), match);
    return done();
  };

  this["`H.slice` keeps opening tags from hotml that precedes slice"] = function(T, done) {
    var hotml, html, match, slice;
    html = "<p>foo <img src=\"x.jpg\"> <b>bar awesome</b> hotmetal</p>";
    match = "<p><img src=\"x.jpg\"></p>";
    hotml = H.HTML.parse(html);
    slice = H.slice(hotml, 1, 2);
    T.eq(H.as_html(slice), match);
    return done();
  };

  this["H.slice honours closing tags"] = function(T, done) {
    var hotml, html, match, slice;
    html = "<p><b>very</b> nice <i>and</i> also good <img src=\"x.jpg\"></p>";
    match = "<p> also good <img src=\"x.jpg\"></p>";
    hotml = H.HTML.parse(html);
    slice = H.slice(hotml, 3, 6);
    T.eq(H.as_html(slice), match);
    return done();
  };

  this["`H.slice` 1"] = function(T, done) {
    var hotml, html, i, idx, match, matches, ref, slice, start, stop;
    html = "<p>foo <img src=\"x.jpg\"> <b>bar awesome</b> baz</p>";
    matches = ["<p><img src=\"x.jpg\"></p>", "<p><img src=\"x.jpg\"> <b>bar</b></p>", "<p><img src=\"x.jpg\"> <b>bar awe-</b></p>", "<p><img src=\"x.jpg\"> <b>bar awesome</b></p>", "<p><img src=\"x.jpg\"> <b>bar awesome</b> baz</p>"];
    hotml = H.HTML.parse(html);
    start = 1;
    idx = -1;
    for (stop = i = 3, ref = hotml.length; 3 <= ref ? i <= ref : i >= ref; stop = 3 <= ref ? ++i : --i) {
      idx += 1;
      match = matches[idx];
      slice = H.slice(hotml, start, stop);
      T.eq(H.as_html(slice), match);
    }
    return done();
  };

  this["`H.slice` 2"] = function(T, done) {
    var hotml, html, i, idx, match, matches, ref, ref1, slice, start, stop;
    html = "a<one>b<two>c<three>d</three>e</two>f</one>g";
    matches = ["a", "a<one>b</one>", "a<one>b<two>c</two></one>", "a<one>b<two>c<three>d</three></two></one>", "a<one>b<two>c<three>d</three>e</two></one>", "a<one>b<two>c<three>d</three>e</two>f</one>", "a<one>b<two>c<three>d</three>e</two>f</one>g"];
    hotml = H.HTML.parse(html);
    start = 0;
    idx = -1;
    for (stop = i = ref = start + 1, ref1 = hotml.length; ref <= ref1 ? i <= ref1 : i >= ref1; stop = ref <= ref1 ? ++i : --i) {
      idx += 1;
      match = matches[idx];
      slice = H.slice(hotml, start, stop);
      T.eq(H.as_html(slice), match);
    }
    return done();
  };

  this["Special characters 1"] = function(T, done) {
    var hotml, html, match;
    html = "foo <b>foo & < > bar</b> baz";
    match = "foo <b>foo &amp; &lt; &gt; bar</b> baz";
    hotml = H.HTML.parse(html);
    T.eq(match, H.as_html(hotml));
    return done();
  };

  this["Special characters 2"] = function(T, done) {
    var hotml, html, match;
    html = "foo <a href=\"foo&amp;bar+baz%64\">baz</a>";
    match = "foo <a href=\"foo&amp;bar+baz%64\">baz</a>";
    hotml = H.HTML.parse(html);
    T.eq(match, H.as_html(hotml));
    return done();
  };

  this["parsing markdown"] = function(T, done) {
    var html, match, md;
    md = "A *pretty* **sophisticated** story, she said.";
    match = '<p loc="0,1">A <em>pretty</em> <strong>sophisticated</strong> story, she said.</p>\n';
    html = H.MARKDOWN.as_html(md);
    T.eq(match, html);
    return done();
  };

  settings = {
    'timeout': 500
  };

  test(this, settings);

}).call(this);
