<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const { frontmatter, page } = useData();

const formattedDate = computed(() => {
  if (!frontmatter.value.date) return "";
  const date = new Date(frontmatter.value.date);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
});

const formattedLastUpdated = computed(() => {
  if (!page.value.lastUpdated) return "";
  const date = new Date(page.value.lastUpdated);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
});

const authors = computed(() => {
  const a = frontmatter.value.authors;
  if (!a || !Array.isArray(a)) return "";
  if (a.length === 1) return a[0];
  if (a.length === 2) return `${a[0]} & ${a[1]}`;
  return a.slice(0, -1).join(", ") + " & " + a[a.length - 1];
});
</script>

<template>
  <div class="blog-byline" v-if="authors || formattedDate">
    <div class="byline-content">
      <div class="author-info" v-if="authors">
        <svg class="author-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span class="author-names">{{ authors }}</span>
      </div>
      <div class="date-info">
        <svg class="date-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <time :datetime="frontmatter.date">{{ formattedDate }}</time>
      </div>
    </div>
    <div class="last-updated" v-if="formattedLastUpdated">
      <svg class="update-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M23 4v6h-6"/>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
      <span>Updated {{ formattedLastUpdated }}</span>
    </div>
  </div>
</template>

<style scoped>
.blog-byline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-brand-1);
}

.byline-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.author-info,
.date-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-icon {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.date-icon {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.author-names {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.date-info time {
  font-size: 0.9375rem;
  color: var(--vp-c-text-2);
}

.last-updated {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.update-icon {
  flex-shrink: 0;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .blog-byline {
    padding: 0.875rem 1rem;
  }

  .byline-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
