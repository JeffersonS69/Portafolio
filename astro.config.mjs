import netlifyIntegration from '@astrojs/netlify';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    integrations: [netlifyIntegration({
        edgeMiddleware: false,
    })],
    devToolbar: {
        enabled: false
    },
    experimental: {
        actions: true,
    },
});
