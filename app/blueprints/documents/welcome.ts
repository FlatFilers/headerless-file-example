export default {
  title: "Welcome",
  slug: "welcome",
  body: `    
<div class="my-doc"> 
<style>
.my-doc {
    display: flex;
    height: calc(100% - 24px);
    overflow: hidden;
    flex-direction: row;
    margin: 24px 24px 0 24px;
    color: #484D6A;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
.my-doc h1 {
    padding: 0px;
    margin: 0px;
    color: #484D6A;
    font-size: 32px;
    margin-bottom: 12px;
}
.my-doc h2 {
    padding: 0px;
    margin: 0px;
    color: #484D6A;
}
.my-doc p {
    padding: 0px;
    margin: 0px;
    line-height: 1.5;
}
.left {
    border-right: 1px solid rgba(72,77,106,0.2);
    margin-right: 48px;
    padding-right: 48px;
    width: 70%;
    display: flex;
    flex-direction: column;
}
.right {
    padding-top: 102px;
    width: 280px;
    flex-shrink: 0;
}
.right > div {
    margin-bottom: 32px;
}
.boxes {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-grow: 1;
    overflow-y: auto;
    padding-right: 20px;
}
.box {
    border: 1px solid rgba(72,77,106,0.1);
    padding: 8px;
    margin-bottom: 16px;
    border-radius: 12px;
    box-shadow: 0px 4px 20px rgba(72,77,106,0.08);
    padding: 24px;
    transition: all 0.2s ease-in-out;
}
.box h2 {
    font-size: 18px; 
    font-weight: 600;
    margin-bottom: 8px;
}
.box p {
    font-size: 14px;
    color: rgba(72,77,106,0.8);
}
.divider {
    height: 1px;
    background: rgba(71, 84, 103, 0.1);
    margin: 12px 0;
    border: none;
}
.tip-box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;
    background-color: rgba(0, 0, 0, 0.03);
    padding: 24px;
    border-radius: 12px;
    max-width: 320px;
    margin-top: 32px;
}
.tip-box svg {
    width: 24px;
    flex-shrink: 0;
    color: rgba(0, 0, 0, 0.8);
}
.tip-box svg path {
    stroke: rgba(0, 0, 0, 0.8);
}
.tip-box p {
    margin: 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
}
.tip-box a {
    color: inherit;
    text-decoration: underline;
}
</style>

<div class="left">
<div style="margin-bottom: 36px;">
<h1>Welcome to Headerless File Import Demo</h1>
<p style="font-weight: 500; font-size: 16px;">This demo shows how to import files without headers in Flatfile.</p>
</div>

<div>
<p style="font-weight: 600;">Follow the steps below to get started:</p>
<hr class="divider">
</div>

<div class="boxes">
<div class="box">
<h2>1. Navigate to the AMS Data Import workbook</h2>
<p>Click on the "AMS Data Import" workbook in the sidebar to open it.</p>
</div>

<div class="box">
<h2>2. Upload your pipe-delimited file</h2>
<p>Upload any pipe-delimited (.txt or .csv) file. The system will automatically:</p>
<ul style="margin-top: 8px; color: rgba(72,77,106,0.8);">
    <li>Detect the pipe delimiter</li>
    <li>Assign predefined headers to each column</li>
    <li>Map the data to the appropriate fields</li>
</ul>
</div>

<div class="box">
<h2>3. Review and edit your data</h2>
<p>After the file is imported, you can review and edit the data as needed.</p>
</div>

<div class="box">
<h2>4. Export or process your data</h2>
<p>Once you're satisfied with the data, you can export it or process it further.</p>
</div>
</div>
</div>

<div class="right">
<div>
<p style="font-weight: 600;">Key features:</p>
<hr class="divider">
</div>

<div class="tip-box">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
    <p>This demo works with any pipe-delimited file, regardless of filename.</p>
</div>

<div class="tip-box" style="margin-top: 16px;">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
    <p>Headers are automatically assigned based on column position.</p>
</div>
</div>
</div>
`,
}; 