import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the independent scent-memory proposal", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /SILLÉANCE/);
  assert.match(html, /Independent concept proposal/i);
  assert.match(html, /Two Weeks Team \/ AgentBa\.se/);
  assert.match(html, /Urbanbrook의 승인·제휴·출시를 의미하지 않습니다/);
  assert.match(html, /scent-flow\.webp/);
  assert.match(html, /RETOUR/);
  assert.match(html, /CLAIR/);
  assert.match(html, /서버로 전송하거나 저장하지 않습니다/);
  assert.match(html, /name="robots" content="noindex, nofollow"/i);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("static export includes the public page and rights-safe assets", async () => {
  const [html, licenses] = await Promise.all([
    readFile(new URL("../dist/client/index.html", import.meta.url), "utf8"),
    readFile(new URL("../ASSET_LICENSES.md", import.meta.url), "utf8"),
  ]);

  assert.match(html, /SILLÉANCE/);
  assert.match(html, /\/og\.png/);
  assert.match(html, /\/scent-flow\.webp/);
  assert.match(licenses, /OpenAI (?:built-in )?image generation/i);

  await Promise.all([
    access(new URL("../dist/client/og.png", import.meta.url)),
    access(new URL("../dist/client/favicon.png", import.meta.url)),
    access(new URL("../dist/client/scent-flow.webp", import.meta.url)),
  ]);
});

test("public source excludes private proposal artifacts and starter preview code", async () => {
  const [page, readme] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
  ]);

  for (const contents of [page, readme]) {
    assert.doesNotMatch(contents, /Urbanbrook_AgentBase_SILLEANCE_1st_Proposal/i);
    assert.doesNotMatch(contents, /MEETING FOLLOW-UP/i);
  }

  await Promise.all([
    assert.rejects(access(new URL("app/_sites-preview/SkeletonPreview.tsx", projectRoot))),
    assert.rejects(access(new URL("app/_sites-preview/preview.css", projectRoot))),
  ]);
});
