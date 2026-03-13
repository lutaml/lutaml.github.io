<script setup lang="ts">
import { data as posts } from "../../posts.data";
import { ref } from "vue";

const hoveredPost = ref<string | null>(null);

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatLastUpdated(timestamp: number | undefined): string {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatAuthors(authors: string[]): string {
  if (!authors || authors.length === 0) return "";
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
  return authors.slice(0, -1).join(", ") + " & " + authors[authors.length - 1];
}
</script>

<template>
  <div class="blog-index">
    <article
      v-for="post in posts"
      :key="post.url"
      class="blog-card"
      @mouseenter="hoveredPost = post.url"
      @mouseleave="hoveredPost = null"
      :class="{ 'is-hovered': hoveredPost === post.url }"
    >
      <a :href="post.url" class="card-link">
        <div class="card-content">
          <div class="card-header">
            <time class="post-date" :datetime="post.date">
              {{ formatDate(post.date) }}
            </time>
            <span v-if="post.lastUpdated" class="updated-badge">
              Updated {{ formatLastUpdated(post.lastUpdated) }}
            </span>
          </div>

          <h2 class="post-title">{{ post.title }}</h2>

          <p v-if="post.description" class="post-excerpt">
            {{ post.description }}
          </p>

          <div class="card-footer">
            <span class="post-authors">
              By {{ formatAuthors(post.authors) }}
            </span>
            <span class="read-more">
              Read article
              <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>
      </a>
    </article>
  </div>
</template>

<style scoped>
.blog-index {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.blog-card {
  position: relative;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.blog-card:hover,
.blog-card.is-hovered {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(30, 64, 175, 0.08);
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.card-content {
  padding: 1.75rem 2rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.post-date {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.updated-badge {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg);
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
}

.post-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--vp-c-text-1);
  transition: color 0.2s ease;
}

.blog-card:hover .post-title {
  color: var(--vp-c-brand-1);
}

.post-excerpt {
  margin: 0 0 1.25rem 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.post-authors {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.read-more {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.blog-card:hover .read-more {
  opacity: 1;
  transform: translateX(0);
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.blog-card:hover .arrow-icon {
  transform: translateX(4px);
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .card-content {
    padding: 1.25rem 1.5rem;
  }

  .post-title {
    font-size: 1.125rem;
  }

  .read-more {
    opacity: 1;
    transform: translateX(0);
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
