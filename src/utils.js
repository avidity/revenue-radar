const Utils = {
    months: function(config) {
        const cfg = config || {};
        const count = cfg.count || 12;
        const section = cfg.section;
        const values = [];
        for (let i = 0; i < count; ++i) {
            values.push(MONTHS[i % 12].substring(0, section));
        }
        return values;
    },
    numbers: function(config) {
        const cfg = config || {};
        const min = cfg.min || 0;
        const max = cfg.max || 1;
        const from = cfg.from || [];
        const count = cfg.count || 8;
        const decimals = cfg.decimals || 8;
        const continuity = cfg.continuity || 1;
        const dfactor = Math.pow(10, decimals) || 0;
        const data = [];
        let i, value;

        for (i = 0; i < count; ++i) {
            value = (from[i] || 0) + Math.random() * max + 100;
            if (Math.random() <= continuity) {
                data.push(Math.round(dfactor * value) / dfactor);
            } else {
                data.push(null);
            }
        }

        return data;
    },
    whites:function(config) {
        const cfg = config || {};
        const min = cfg.min || 0;
        const max = cfg.max || 1;
        const from = cfg.from || [];
        const count = cfg.count || 8;
        const decimals = cfg.decimals || 8;
        const continuity = cfg.continuity || 1;
        const dfactor = Math.pow(10, decimals) || 0;
        const data = [];
        let i, value;

        for (i = 0; i < count; ++i) {
            value = (from[i] || 0) + Math.random() * (25-10) + 10;
            if (Math.random() <= continuity) {
                data.push(Math.round(dfactor * value) / dfactor);
            } else {
                data.push(null);
            }
        }

        return data;
    },
    CHART_COLORS: {
        red: 'rgb(255, 99, 132)',
        blue: 'rgb(54, 162, 235)',
        green: 'rgb(75, 192, 192)',
    }
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];