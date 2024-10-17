


import React from 'react';

const PanForm = () => {

//   const encData = `{\"reqEntityData\":{\"txnid\":\"bit00010\",\"reqTs\":\"2024-10-09T14:46:33:000000\",\"entityId\":\"FlowzyLTD\",\"dscProvider\":\"Pantagon\",\"dscSerialNumber\":\"7f7db07aa17f8d50\",\"dscExpiryDate\":\"2025-06-10\",\"returnUrl\":\"https://live.zlink.co.in/api/nsdl/redirect\",\"formData\":\"eyJhcHBsaWNhbnREdG8iOnsiYXBwbGlUeXBlIjoiQSIsImNhdGVnb3J5IjoiQSIsInRpdGxlIjowLCJsYXN0TmFtZSI6IiIsImZpcnN0TmFtZSI6IiIsIm1pZGRsZU5hbWUiOiIiLCJkb2IiOiIiLCJnZW5kZXIiOiJOIiwiY29uc2VudCI6ZmFsc2UsIm5hbWVPblBhbkNhcmQiOiIiLCJrbm93bkJ5T3RoZXJOYW1lIjoiIiwib3RoZXJUaXRsZSI6IjAiLCJvdGhlckxhc3ROYW1lIjoiIiwib3RoZXJGaXJzdE5hbWUiOiIiLCJvdGhlck1pZGRsZU5hbWUiOiIiLCJhcHBsbk1vZGUiOiJFIiwibmFtZUFzUGVyQWFkaGFyIjoiIn0sInBhcmVudHNEZXRhaWxzIjp7InNpbmdsZVBhcmVudCI6IiIsImZhdGhlckxhc3ROYW1lIjoiIiwiZmF0aGVyRmlyc3ROYW1lIjoiIiwiZmF0aGVyTWlkZGxlTmFtZSI6IiIsIm1vdGhlckxhc3ROYW1lIjoiIiwibW90aGVyRmlyc3ROYW1lIjoiIiwibW90aGVyTWlkZGxlTmFtZSI6IiIsInBhcmVudE5hbWVQcmludCI6IiJ9LCJvdGhlckRldGFpbHMiOnsicGh5UGFuSXNSZXEiOiJOIiwic291cmNlT2ZJbmNvbWUiOnsic2FsYXJ5IjpmYWxzZSwib3RoZXJTb3VyY2UiOmZhbHNlLCJidXNpbmVzc1Byb2YiOmZhbHNlLCJidXNpbmVzc1ByZkNvZGUiOiIwIiwibm9JbmNvbWUiOmZhbHNlLCJob3VzZVBybyI6ZmFsc2UsImNhcGl0YWxHYWlucyI6ZmFsc2V9LCJhZGRyRm9yQ29tbXVuaWNhdGlvbiI6Im5vbmUiLCJvZmZpY2VBZGRyZXNzIjp7ImZsYXRObyI6IiIsIm5hbWVPZlByZW1pc2VzIjoiIiwicm9hZCI6IiIsImFyZWEiOiIiLCJ0b3duIjoiIiwiY291bnRyeU5hbWUiOiJub25lIiwic3RhdGUiOiJub25lIiwicGluQ29kZSI6IiIsInppcENvZGUiOiIiLCJvZmZpY2VOYW1lIjoiIn0sImlzZENvZGUiOiIiLCJzdGRDb2RlIjoiIiwidGVsT3JNb2JObyI6IiIsImVtYWlsSWQiOiIiLCJwbGFjZSI6IiIsImRhdGUiOiIiLCJyZXNpZGVuY2VBZGRyZXNzIjp7InJmbGF0Tm8iOiIiLCJybmFtZU9mUHJlbWlzZXMiOiIiLCJycm9hZCI6IiIsInJhcmVhIjoiIiwicnRvd24iOiIiLCJyY291bnRyeU5hbWUiOiJub25lIiwicnN0YXRlIjoibm9uZSIsInJwaW5Db2RlIjoiIiwicnppcENvZGUiOiIifSwicmFWYWx1ZSI6IiIsInJhVGl0bGUiOiIwIiwicmFMYXN0TmFtZSI6IiIsInJhRmlyc3ROYW1lIjoiIiwicmFNaWRkbGVOYW1lIjoiIiwicmFBZGRyZXNzIjp7InJhRmxhdE5vIjoiIiwicmFOYW1lT2ZQcmVtaXNlcyI6IiIsInJhUm9hZCI6IiIsInJhQXJlYSI6IiIsInJhVG93biI6IiIsInJhQ291bnRyeU5hbWUiOiJub25lIiwicmFTdGF0ZSI6Im5vbmUiLCJyYVBpbkNvZGUiOiIiLCJyYVppcENvZGUiOiIifX0sImFvQ29kZSI6eyJhcmVhQ29kZSI6IiIsImFvVHlwZSI6IiIsInJhbmdlQ29kZSI6IiIsImFvTm8iOiIifX0\\=\",\"authKey\":\"FlowzyLTD\",\"branchCode\":\"\"},\"signature\":\"jIpi1SsB0zltR0fwcCEEgAxVg3l1FsuFrK6io9z8hy55s2B4OPMd0YxS5YxbNhZCye6aMwJbJO1f3unrwIQ5CQedJ/2C+iKeBOMGJjr5XGHhvSq6EAgdAdJHwdW0FrGiXQZZh82WlJKRjM8WLliOhWXPkWMJZs9GlKPTPuC8ueKfTQHwwhL0OllPx+rBukIBapffQ+rssN7dplEbvejBnrCFe6V4z8INJANvPaeAkpp4CDdJmv5e9xZ/hNEz1JR+W/fdJvkh0HL02Fxy+NdsArRmbgUklcWIZznuzdVxpV+IAk3xkmbhR7JPJJBAu+KmZuxsFHrFWnafx27anzXjvg\\=\=\"}\n`;

// const cleanedEncData = encData.replace(/\\/g, "");

// console.log(cleanedEncData);


  const submitRequest = () => {
    const url = 'https://assisted-service.egov-nsdl.com/SpringBootFormHandling/newPanReq';
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;

    // The formData you want to submit
    const formData = {
      reqEntityData: {
        txnid: 'bit00011',
        reqTs: '2024-10-09T16:18:46:000000',
        entityId: 'FlowzyLTD',
        dscProvider: 'Pantagon',
        dscSerialNumber: '7f7db07aa17f8d50',
        dscExpiryDate: '2025-06-10',
        returnUrl: 'https://live.zlink.co.in/api/nsdl/redirect',
        formData: 'eyJhcHBsaWNhbnREdG8iOnsiYXBwbGlUeXBlIjoiQSIsImNhdGVnb3J5IjoiQSIsInRpdGxlIjowLCJsYXN0TmFtZSI6IiIsImZpcnN0TmFtZSI6IiIsIm1pZGRsZU5hbWUiOiIiLCJkb2IiOiIiLCJnZW5kZXIiOiJOIiwiY29uc2VudCI6ZmFsc2UsIm5hbWVPblBhbkNhcmQiOiIiLCJrbm93bkJ5T3RoZXJOYW1lIjoiIiwib3RoZXJUaXRsZSI6IjAiLCJvdGhlckxhc3ROYW1lIjoiIiwib3RoZXJGaXJzdE5hbWUiOiIiLCJvdGhlck1pZGRsZU5hbWUiOiIiLCJhcHBsbk1vZGUiOiJFIiwibmFtZUFzUGVyQWFkaGFyIjoiIn0sInBhcmVudHNEZXRhaWxzIjp7InNpbmdsZVBhcmVudCI6IiIsImZhdGhlckxhc3ROYW1lIjoiIiwiZmF0aGVyRmlyc3ROYW1lIjoiIiwiZmF0aGVyTWlkZGxlTmFtZSI6IiIsIm1vdGhlckxhc3ROYW1lIjoiIiwibW90aGVyRmlyc3ROYW1lIjoiIiwibW90aGVyTWlkZGxlTmFtZSI6IiIsInBhcmVudE5hbWVQcmludCI6IiJ9LCJvdGhlckRldGFpbHMiOnsicGh5UGFuSXNSZXEiOiJOIiwic291cmNlT2ZJbmNvbWUiOnsic2FsYXJ5IjpmYWxzZSwib3RoZXJTb3VyY2UiOmZhbHNlLCJidXNpbmVzc1Byb2YiOmZhbHNlLCJidXNpbmVzc1ByZkNvZGUiOiIwIiwibm9JbmNvbWUiOmZhbHNlLCJob3VzZVBybyI6ZmFsc2UsImNhcGl0YWxHYWlucyI6ZmFsc2V9LCJhZGRyRm9yQ29tbXVuaWNhdGlvbiI6Im5vbmUiLCJvZmZpY2VBZGRyZXNzIjp7ImZsYXRObyI6IiIsIm5hbWVPZlByZW1pc2VzIjoiIiwicm9hZCI6IiIsImFyZWEiOiIiLCJ0b3duIjoiIiwiY291bnRyeU5hbWUiOiJub25lIiwic3RhdGUiOiJub25lIiwicGluQ29kZSI6IiIsInppcENvZGUiOiIiLCJvZmZpY2VOYW1lIjoiIn0sImlzZENvZGUiOiIiLCJzdGRDb2RlIjoiIiwidGVsT3JNb2JObyI6IiIsImVtYWlsSWQiOiIiLCJwbGFjZSI6IiIsImRhdGUiOiIiLCJyZXNpZGVuY2VBZGRyZXNzIjp7InJmbGF0Tm8iOiIiLCJybmFtZU9mUHJlbWlzZXMiOiIiLCJycm9hZCI6IiIsInJhcmVhIjoiIiwicnRvd24iOiIiLCJyY291bnRyeU5hbWUiOiJub25lIiwicnN0YXRlIjoibm9uZSIsInJwaW5Db2RlIjoiIiwicnppcENvZGUiOiIifSwicmFWYWx1ZSI6IiIsInJhVGl0bGUiOiIwIiwicmFMYXN0TmFtZSI6IiIsInJhRmlyc3ROYW1lIjoiIiwicmFNaWRkbGVOYW1lIjoiIiwicmFBZGRyZXNzIjp7InJhRmxhdE5vIjoiIiwicmFOYW1lT2ZQcmVtaXNlcyI6IiIsInJhUm9hZCI6IiIsInJhQXJlYSI6IiIsInJhVG93biI6IiIsInJhQ291bnRyeU5hbWUiOiJub25lIiwicmFTdGF0ZSI6Im5vbmUiLCJyYVBpbkNvZGUiOiIiLCJyYVppcENvZGUiOiIifX0sImFvQ29kZSI6eyJhcmVhQ29kZSI6IiIsImFvVHlwZSI6IiIsInJhbmdlQ29kZSI6IiIsImFvTm8iOiIifX0=',
        authKey: 'FlowzyLTD',
        branchCode: '',
      },
      signature: 'a0zyAjvQwVFGtVw0/Czvh4E7GhaNf41EGkJjnIsesHIOqL2rNySXGmIybUw2FvC7Fs7Vl8RuKJy5knqk6CvQlZxP7l1Lx/a4W72aC0zWhOdPnX9kZ0H5yZus7ruWiytDinIqfLkNhvSNBytI9KPnWRaiE3HcJau0tgwdxwsExJQumYeLGFKQQPnI51prGC5OO71mWv2CHYoGMq1uI+8nJF22SanDJ3DpG9pp4SDYFRj9zTNFKZI/QhPvcSm9KQlVuoPMRyRV/AWEinzbWYk7IOz+q8Q9TlROffB+R4XbMJzX6LtBITiLOG87K9Stt2hWgWNo85DMIg70/KJLU+S5ng==',
    
  };

    // Create a single input field with the entire formData as a JSON string
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'req'; // This matches the structure of your axios request
    input.value = JSON.stringify(formData); // JSON stringify the entire formData

    form.appendChild(input);

    // Append the form to the document body and submit it
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <h1>PAN API Request</h1>
      <button onClick={submitRequest}>Submit PAN Request</button>
    </div>
  );
};

export default PanForm;


