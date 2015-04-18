/*
 * Copyright Adam Pritchard 2015
 * MIT License : http://adampritchard.mit-license.org/
 */

'use strict';
/*jshint node:true*/
/* global describe, it, before, beforeEach, after, afterEach */
/*eslint-env mocha*/

var expect = require('chai').expect;

describe('markdown-it-smartarrows', function () {

  it('should operate only if enabled', function() {
    var md, s, target;

    // Enabled via `smartArrows` option default
    md = require('markdown-it')().use(require('../'));
    s = '-->';
    target = '<p>→</p>\n';
    expect(md.render(s)).to.equal(target);

    // Enabled via `smartArrows` option
    md = require('markdown-it')({smartArrows:true}).use(require('../'));
    s = '-->';
    target = '<p>→</p>\n';
    expect(md.render(s)).to.equal(target);

    // Disabled via `smartArrows` option
    md = require('markdown-it')({smartArrows:false}).use(require('../'));
    s = '-->';
    target = '<p>--&gt;</p>\n';
    expect(md.render(s)).to.equal(target);
  });

  it('should render smart arrows', function() {
    var s, target;
    var md = require('markdown-it')({typographer:true}).use(require('../'));

    s = '--> <-- <--> ==> <== <==>';
    target = '<p>→ ← ↔ ⇒ ⇐ ⇔</p>\n';
    expect(md.render(s)).to.equal(target);

    // And should not break headers or m-dashes
    s = 'Arrows\n==\nAnd friends\n--\n--> <-- <--> ==> <== <==> --- m-dash -- n-dash';
    target = '<h1>Arrows</h1>\n<h2>And friends</h2>\n<p>→ ← ↔ ⇒ ⇐ ⇔ — m-dash – n-dash</p>\n';
    expect(md.render(s)).to.equal(target);
  });
});
