/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-default-export */
"use client";

import { useParams } from 'next/navigation';
import React, { useState } from 'react';

const DEFAULTS = {
  width: 400,
  height: 600,
  buttonText: 'Join Waitlist',
  buttonColor: '#2563eb',
  buttonTextColor: '#fff',
  backgroundColor: '#fff',
  textColor: '#222',
  borderRadius: 8,
  fontFamily: '',
  showLabels: true,
  formLayout: 'stacked',
  showBranding: true,
};

export default function WaitlistEmbedPage() {
  const params = useParams();
  const waitlistId = params?.id as string;
  const [options, setOptions] = useState({ ...DEFAULTS });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | number | boolean = value;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    }
    setOptions((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const query = new URLSearchParams({
    waitlistId,
    buttonText: options.buttonText,
    buttonColor: options.buttonColor,
    buttonTextColor: options.buttonTextColor,
    backgroundColor: options.backgroundColor,
    textColor: options.textColor,
    borderRadius: String(options.borderRadius),
    fontFamily: options.fontFamily,
    showLabels: String(options.showLabels),
    formLayout: options.formLayout,
    showBranding: String(options.showBranding),
  }).toString();

  const iframeCode = `<iframe src="${process.env.NEXT_PUBLIC_APP_URL || 'https://waitlistnow.app'}/widget/iframe?${query}" width="${options.width}" height="${options.height}" style="border:none;"></iframe>`;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Embed Waitlist Widget</h1>
      <p className="mb-6 text-gray-600">
        You can embed your waitlist widget on any website using the iframe code below. Customize the options and copy the code to your site.
      </p>
      <form className="grid grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col">
          Width
          <input type="number" name="width" value={options.width} onChange={handleChange} className="input" />
        </label>
        <label className="flex flex-col">
          Height
          <input type="number" name="height" value={options.height} onChange={handleChange} className="input" />
        </label>
        <label className="flex flex-col col-span-2">
          Button Text
          <input type="text" name="buttonText" value={options.buttonText} onChange={handleChange} className="input" />
        </label>
        <label className="flex flex-col">
          Button Color
          <input type="color" name="buttonColor" value={options.buttonColor} onChange={handleChange} className="input" />
        </label>
        <label className="flex flex-col">
          Button Text Color
          <input type="color" name="buttonTextColor" value={options.buttonTextColor} onChange={handleChange} className="input" />
        </label>
        <label className="flex flex-col">
          Background Color
          <input type="color" name="backgroundColor" value={options.backgroundColor} onChange={handleChange} className="input" />
        </label>
        <label className="flex flex-col">
          Text Color
          <input type="color" name="textColor" value={options.textColor} onChange={handleChange} className="input" />
        </label>
        <label className="flex flex-col">
          Border Radius
          <input type="number" name="borderRadius" value={options.borderRadius} onChange={handleChange} className="input" />
        </label>
        <label className="flex flex-col col-span-2">
          Font Family
          <input type="text" name="fontFamily" value={options.fontFamily} onChange={handleChange} className="input" />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="showLabels" checked={options.showLabels} onChange={handleChange} />
          Show Labels
        </label>
        <label className="flex flex-col">
          Form Layout
          <select name="formLayout" value={options.formLayout} onChange={handleChange} className="input">
            <option value="stacked">Stacked</option>
            <option value="inline">Inline</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="showBranding" checked={options.showBranding} onChange={handleChange} />
          Show Branding
        </label>
      </form>
      <div className="mb-4">
        <label className="font-semibold mb-2 block">Iframe Code</label>
        <textarea
          className="w-full font-mono p-2 border rounded bg-gray-50"
          rows={3}
          value={iframeCode}
          readOnly
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div className="mb-8">
        <label className="font-semibold mb-2 block">Live Preview</label>
        <div className="border rounded overflow-hidden" style={{ width: options.width, height: options.height }}>
          <iframe
            src={`${process.env.NEXT_PUBLIC_APP_URL || 'https://waitlistnow.app'}/widget/iframe?${query}`}
            width={options.width}
            height={options.height}
            style={{ border: 'none' }}
            title="Waitlist Widget Preview"
          />
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">How to Use</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Copy and paste the iframe code into your website's HTML where you want the widget to appear.</li>
        <li>You can further customize the widget by changing the options above.</li>
        <li>All customization options are supported as query parameters in the iframe URL.</li>
      </ul>
      <h3 className="text-lg font-semibold mb-1">Supported Query Parameters</h3>
      <ul className="list-disc pl-6 text-gray-700">
        <li><b>waitlistId</b> (required): Your waitlist's unique ID</li>
        <li><b>buttonText</b>: Text for the submit button</li>
        <li><b>buttonColor</b>: Button background color (hex)</li>
        <li><b>buttonTextColor</b>: Button text color (hex)</li>
        <li><b>backgroundColor</b>: Widget background color (hex)</li>
        <li><b>textColor</b>: Widget text color (hex)</li>
        <li><b>borderRadius</b>: Border radius in px</li>
        <li><b>fontFamily</b>: Custom font family</li>
        <li><b>showLabels</b>: Show field labels (true/false)</li>
        <li><b>formLayout</b>: "stacked" or "inline"</li>
        <li><b>showBranding</b>: Show "Powered by WaitlistNow" (true/false)</li>
      </ul>
    </div>
  );
} 