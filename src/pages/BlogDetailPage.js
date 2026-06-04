import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../data/index.js';
import { Reveal } from '../components/index.js';

const ALL_TAGS = [...new Set(BLOG_POSTS.flatMap(function(p){ return p.tags; }))];

function BlogDetailSidebar({ go, currentIdx }) {
  var related = BLOG_POSTS.filter(function(_, i){ return i !== currentIdx; }).slice(0, 4);
  return (
    <motion.div
      className="blog-sidebar"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Related Articles */}
      <div className="sidebar-card">
        <h3 style={{ fontFamily: 'Sora,sans-serif', color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
          Related Articles
        </h3>
        {related.map(function(p, i) {
          var idx = BLOG_POSTS.indexOf(p);
          return (
            <motion.div key={i}
              onClick={function(){ go('blog_' + idx); window.scrollTo({ top: 0 }); }}
              style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14, cursor: 'pointer', padding: 8, borderRadius: 8 }}
              whileHover={{x: 3}}
            >
              <span style={{ fontSize: 22, flexShrink: 0 }}>{p.em}</span>
              <div>
                <p style={{ color: 'rgba(255,255,255, 0.8)', fontSize: 12.5, fontWeight: 500, lineHeight: 1.45 }}>{p.title}</p>
                <p style={{ color: 'rgba(255,255,255, 0.32)', fontSize: 11, marginTop: 3 }}>{p.cat} &middot; {p.read}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* All Tags */}
      <div className="sidebar-card">
        <h3 style={{ fontFamily: 'Sora,sans-serif', color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 14 }}>
          All Tags
        </h3>
        <div className="tag-cloud">
          {ALL_TAGS.map(function(tag) {
            return (
              <motion.button key={tag} className="tag-pill"
                onClick={function(){ go('blog'); }}
                whileHover={{scale: 1.08}}
              >
                {tag}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Newsletter */}
      <motion.div className="sidebar-card"
        style={{ background: 'linear-gradient(135deg,rgba(0,201,255, 0.08),rgba(79,255,176, 0.04))', border: '1px solid rgba(0,201,255, 0.18)' }}
      >
        <h3 style={{ fontFamily: 'Sora,sans-serif', color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
          Stay Updated
        </h3>
        <p style={{ color: 'rgba(255,255,255, 0.44)', fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>
          Get articles like this weekly.
        </p>
        <input
          placeholder="your@email.com"
          style={{ background: 'rgba(0,10,40, 0.97)', border: '1px solid rgba(0,201,255, 0.28)', borderRadius: 9, color: '#fff', fontFamily: 'Manrope,sans-serif', fontSize: 13, padding: '9px 13px', width: '100%', outline: 'none', marginBottom: 10 }}
        />
        <motion.button className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: 13 }} whileHover={{scale: 1.03}}>
          Subscribe
        </motion.button>
      </motion.div>

      {/* CTA */}
      <motion.div className="sidebar-card"
        style={{ textAlign: 'center', border: '1px solid rgba(255,215,0, 0.2)' }}
        whileHover={{ y: 0 }}
      >
        <motion.span
          style={{ fontSize: 36, display: 'block', marginBottom: 10 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          &#9876;
        </motion.span>
        <h3 style={{ fontFamily: 'Sora,sans-serif', color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
          Want this for your business?
        </h3>
        <motion.button
          className="btn-gold"
          style={{ width: '100%', padding: '10px', fontSize: 13 }}
          onClick={function(){ go('contact'); }}
          whileHover={{scale: 1.04}}
        >
          Get Free Consultation
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function BlogDetailPage({ id, go }) {
  var post = BLOG_POSTS[id] || BLOG_POSTS[0];
  var paragraphs = post.body.split('\n\n');

  return (
    <div style={{ paddingTop: 88 }}>
      <article style={{ padding: '60px 0 80px' }}>
        <div className="wrap">
          <div className="blog-layout">
            {/* Article content */}
            <div>
              <motion.button
                onClick={function(){ go('blog'); }}
                style={{ background: 'rgba(255,255,255, 0.05)', border: '1px solid rgba(255,255,255, 0.1)', color: 'rgba(255,255,255, 0.65)', padding: '7px 16px', borderRadius: 8, marginBottom: 32, fontSize: 13, cursor: 'pointer', fontFamily: 'Manrope,sans-serif' }}
                whileHover={{color: '#fff'}}
              >
                Back to Blog
              </motion.button>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                {/* Meta */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 22, flexWrap: 'wrap' }}>
                  <span style={{ background: post.col + '22', border: '1px solid ' + post.col + '44', color: post.col, fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
                    {post.cat}
                  </span>
                  <span style={{ color: 'rgba(255,255,255, 0.32)', fontSize: 13 }}>{post.date}</span>
                  <span style={{ color: 'rgba(255,255,255, 0.32)', fontSize: 13 }}>&#183; {post.read} read</span>
                </div>

                {/* Title */}
                <h1 style={{ fontFamily: 'Sora,sans-serif', color: '#fff', fontSize: 'clamp(24px,4vw,44px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 22, letterSpacing: '-.5px' }}>
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p style={{ color: 'rgba(255,255,255, 0.62)', fontSize: 17, lineHeight: 1.82, marginBottom: 32, fontStyle: 'italic', borderLeft: '3px solid ' + post.col, paddingLeft: 20 }}>
                  {post.exc}
                </p>

                {/* Divider */}
                <div style={{ height: 1, background: 'linear-gradient(90deg,' + post.col + '55,transparent)', marginBottom: 32 }} />

                {/* Body paragraphs */}
                {paragraphs.map(function(para, i) {
                  return (
                    <motion.p key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      style={{ color: 'rgba(255,255,255, 0.7)', fontSize: 15.5, lineHeight: 1.92, marginBottom: 22 }}
                    >
                      {para}
                    </motion.p>
                  );
                })}

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32, marginBottom: 32 }}>
                  {post.tags.map(function(t) {
                    return (
                      <span key={t} style={{ background: 'rgba(0,201,255, 0.08)', border: '1px solid rgba(0,201,255, 0.2)', color: 'var(--c1)', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20 }}>
                        {t}
                      </span>
                    );
                  })}
                </div>

                {/* Inline CTA */}
                <Reveal>
                  <motion.div
                    style={{ padding: '24px', background: 'rgba(0,0,0, 0.3)', border: '1px solid ' + post.col + '33', borderRadius: 14 }}
                    whileHover={{borderColor: post.col + '66'}}
                  >
                    <p style={{ color: post.col, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>
                      Want to implement this for your business?
                    </p>
                    <p style={{ color: 'rgba(255,255,255, 0.52)', fontSize: 14, lineHeight: 1.75, marginBottom: 16 }}>
                      Aquron has hands-on experience across 150+ projects. Let&apos;s talk.
                    </p>
                    <motion.button
                      className="btn-gold"
                      onClick={function(){ go('contact'); }}
                      style={{ fontSize: 14, padding: '10px 22px' }}
                      whileHover={{scale: 1.04}}
                    >
                      Get Free Consultation
                    </motion.button>
                  </motion.div>
                </Reveal>
              </motion.div>
            </div>

            {/* Sidebar */}
            <BlogDetailSidebar go={go} currentIdx={id} />
          </div>
        </div>
      </article>
    </div>
  );
}
