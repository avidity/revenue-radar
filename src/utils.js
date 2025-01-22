


const Utils = {
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
            value = (from[i] || 0) + Math.random() * (800-250) + 250;
            if (Math.random() <= continuity) {
                data.push(Math.round(dfactor * value) / dfactor);
            } else {
                data.push(null);
            }
        }

        return data;
    },
};

