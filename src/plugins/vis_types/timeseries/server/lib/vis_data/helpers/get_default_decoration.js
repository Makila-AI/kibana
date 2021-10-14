/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const getDefaultDecoration = (series) => {
  const pointSize =
    series.point_size != null ? Number(series.point_size) : Number(series.line_width);
  const showPoints = series.chart_type === 'line' && pointSize !== 0;

  return {
    seriesId: series.id,
    stack: series.stacked,
    lines: {
      show: series.chart_type === 'line' && series.line_width !== 0,
      fill: Number(series.fill),
      lineWidth: Number(series.line_width),
      steps: series.steps || false,
    },
    points: {
      show: showPoints,
      radius: 1,
      lineWidth: showPoints ? pointSize : 5,
    },
    bars: {
      show: series.chart_type === 'bar',
      fill: Number(series.fill),
      lineWidth: Number(series.line_width),
      showValueLabel: Boolean(series.show_value_label),
      valueLabelFontSize: {
        min: series.value_label_font_min || 10,
        max: series.value_label_font_max || 20,
      },
      valueLabelFill: {
        color: series.value_label_fill_color || '#000',
        borderColor: series.value_label_fill_bordercolor || '#FFF',
        borderWidth: series.value_label_fill_borderwidth || 0.5,
      },
    },
  };
};
