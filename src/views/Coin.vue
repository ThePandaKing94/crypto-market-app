<template>
  <div class="coin">
    <div class="container coin-details">
      <div v-if="coin">
        <div class="coin-logo text-center">
          <img :src="coin.image.large">
        </div>
        <div class="title text-center my-2">
          <h1>{{ coin.name }}</h1>
        </div>


        <div class="stats">
          <div class="row">


            <div class="col-md-4">
              <div class="stat">
                <h5 class="title">Market Cap</h5>
                <h3>{{coin.market_data.market_cap.usd | formatToCurrency }}</h3>
              </div>
            </div>



            <div class="col-md-4">
              <div class="stat">
                <h5 class="title">Volume</h5>
                <h3>{{coin.market_data.total_volume.usd | formatToCurrency }}</h3>
              </div>
            </div>

            <div class="col-md-4">
              <div class="stat">
                <h5 class="title">Circulating in Supply</h5>
                <h3>{{coin.market_data.circulating_supply }}</h3>
              </div>
            </div>

            <div class="col-md-4">
              <div class="stat">
                <h5 class="title">Price</h5>
                <h3>{{coin.market_data.current_price.usd | formatToCurrency }}</h3>
              </div>
            </div>

            <div class="col-md-4">
              <div class="stat">
                <h5 class="title">ATH</h5>
                <h3>{{coin.market_data.ath.usd | formatToCurrency }}</h3>
              </div>
            </div>



            <div class="col-md-4">
              <div class="stat">
                <h5 class="title">ATL</h5>
                <h3>{{coin.market_data.atl.usd | formatToCurrency }}</h3>
              </div>
            </div>


          </div>

        </div>


        <div class="history mt-4">
          <div class="section-title">
            <h3 class="text-uppercase">History</h3>
          </div>

          <div class="history-table">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Volume</th>
                  <th>Market Cap</th>
                </tr>
              </thead>
              <tbody>
                  <tr v-for="(history, index) of history" :key="index">
                    <td>{{history.date}}</td>
                    <td>{{ (history.price | to2Dec )| formatToCurrency}}</td>
                    <td>{{history.volume | formatToCurrency}}</td>
                    <td>{{history.market_cap | formatToCurrency}}</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="description mt-4">
          <h3>Description</h3>
          <p v-html="coin.description.en"></p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import http from "@/utils/http";

export default {
  name: "Coin",
  data: ()=> ({
    coin: null,
    history: [],
    historyData: null
  }),
  filters: {
    to2Dec(val){
      return parseFloat(val).toFixed(2)
    },
    formatToCurrency(value){
      return (value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    }
  },
  mounted() {
    this.getCoin();
    this.getHistory();
  },
  methods: {
    async getCoin(){
      try {
        const {data} = await http.get('/coins/'+this.$route.params.id);
        // console.log(data)
        this.coin = data
      }catch (e){
        console.log(e)
      }
    },

    async getHistory(){
      try {
        const {data} = await http.get('/coins/'+this.$route.params.id+'/market_chart', {
          params: {
            days:30,
            vs_currency: 'USD',
            interval: 'daily'
          }
        });

        this.historyData = data

        this.history = data
            .prices
            .map(([epocTime, value], index) => {
              let date = new Date(epocTime);
              return {
                date: date.toISOString().split('T')[0],
                price: value,
                market_cap: this.historyData.market_caps[index][0],
                volume: this.historyData.total_volumes[index][0],
              }
            }).reverse()
      }catch (e){
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

.coin-details{
  background: #171f29;
  color: #fff;
  padding: 30px;
  margin-top: 30px;
}

.history-table table, .history-table td, .history-table th{
  border: solid #b0bec5 1px;
  color:#b0bec5;
  text-align: center;
}

.stats .stat{
  background-color: #080f15;
  padding: 20px;
  margin: 20px 0;
}

.stat .title{
  color: #b0bec5;
  font-size: 15px;
}


</style>
