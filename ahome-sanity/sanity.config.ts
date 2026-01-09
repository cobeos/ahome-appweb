import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// #region agent log
const propertySchema = schemaTypes.find((s: any) => s?.name === 'property');
const statusField = propertySchema?.fields?.find((f: any) => f?.name === 'status');
const allFieldNames = propertySchema?.fields?.map((f: any) => f?.name) || [];
const hasPreview = !!propertySchema?.preview;
fetch('http://127.0.0.1:7243/ingest/6ef4c250-14e1-4b6c-84dc-8ddc47661f00',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'sanity.config.ts',message:'Sanity config loaded',data:{schemaTypesCount:schemaTypes.length,hasPropertySchema:!!propertySchema,hasStatusField:!!statusField,statusFieldTitle:statusField?.title,statusFieldIndex:allFieldNames.indexOf('status'),allFieldNames,hasPreview,previewSelectStatus:!!propertySchema?.preview?.select?.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
// #endregion

export default defineConfig({
  name: 'default',
  title: 'A•HOME Riviera Maya',

  projectId: 'l1i2gzba',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
