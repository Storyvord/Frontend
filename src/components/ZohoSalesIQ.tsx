"use client";
import { useEffect } from "react";

const ZohoSalesIQ: React.FC = () => {
  useEffect(() => {
    const initializeZohoSalesIQ = () => {
      const widgetCode = process.env.NEXT_PUBLIC_ZOHO_SALESIQ_WIDGET_CODE;
      if (!widgetCode) {
        console.error("Zoho SalesIQ widget code is missing!");
        return;
      }

      const $zoho = (window as any).$zoho || {};
      (window as any).$zoho = $zoho;
      $zoho.salesiq = $zoho.salesiq || {
        widgetcode: widgetCode,
        values: {},
        ready: function () {},
      };

      const d = document;
      const s = d.createElement("script");
      s.type = "text/javascript";
      s.id = "zsiqscript";
      s.defer = true;
      s.src = "https://salesiq.zoho.in/widget";
      const t = d.getElementsByTagName("script")[0];
      if (t?.parentNode) {
        t.parentNode.insertBefore(s, t);
      }

      // Create the widget container if it doesn't already exist
      if (!d.getElementById("zsiqwidget")) {
        const widgetDiv = d.createElement("div");
        widgetDiv.id = "zsiqwidget";
        d.body.appendChild(widgetDiv);
      }
    };

    initializeZohoSalesIQ();
  }, []);

  return null; // No visual output
};

export default ZohoSalesIQ;
