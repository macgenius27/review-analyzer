const vm = new Vue({
    el: "#reviewAnalyzer",
    data: {
        review: null,
        result: null,
        loader: false,
        analyzeButton: false
    },
    methods: {
        analyze() {
            if(!this.review) return false;
            const self = this;
            self.analyzeButton = true;
            self.loader = true;
            axios.post('/analyze', {review: this.review}).then(response => {
                self.analyzeButton = false;
                self.loader = false;
                const result = response.data.score;
                if(result > 0) {
                    self.result = "positive";
                } else if(result == 0) {
                    self.result = "neutral";
                } else {
                    self.result = "negative";
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }
})