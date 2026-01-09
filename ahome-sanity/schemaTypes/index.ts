import property from "./property";

// #region agent log
const hasStatusField = property?.fields?.some((f: any) => f?.name === "status");
fetch('http://127.0.0.1:7243/ingest/6ef4c250-14e1-4b6c-84dc-8ddc47661f00',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'schemaTypes/index.ts',message:'Schema types export',data:{propertyName:property?.name,hasStatusField,fieldCount:property?.fields?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
// #endregion

export const schemaTypes = [property];
