<template>
<div class="coins-list">
  <div class="container">
    <div class="row">
      <router-link :to="'/coin/'+coin.id" class="col-md-3 coin-link" v-for="(coin, index) of coins" :key="index">
        <div class="coin">
          <div class="coin-logo mb-2">
            <img :src="coin.image" width="70px">
          </div>
          <div class="coin-name">
            <h4>{{coin.name}}</h4>
          </div>
          <div class="stats">
            <div class="price my-4">
              <h6 class="price-down" v-if="coin.price_change_percentage_24h < 0">
                {{ coin.current_price | formatToCurrency }} ({{coin.price_change_percentage_24h | to2Dec}}%)
                <img src="images/download-arrow.svg" width="15" class="crypt-market-cap-logo" alt="logo">
              </h6>

              <h6 class="price-up" v-else>
                {{ coin.current_price | formatToCurrency }} ({{coin.price_change_percentage_24h | to2Dec}}%)
                <img src="images/up-arrow.svg" width="15" class="crypt-market-cap-logo" alt="logo">
              </h6>
            </div>

            <div class="market-cap">
              <h5>{{coin.market_cap | formatToCurrency}}</h5>
              <p><b>MARKET CAP</b></p>
            </div>

          </div>
        </div>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
import http from "@/utils/http";
export default {
  name: 'Home',
  components: {},
  data:() => ({
    coins: []
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
    this.getCoins()
  },
  methods: {

   async getCoins(){
     try {
       const {data} = await http.get('/coins/markets', {
         params: {
           vs_currency: 'usd'
         }
       });
      this.coins = data
     }catch (e){
       console.log(e)
     }
    }
  }
}
</script>
<style scoped>

.coins-list{
  margin-top: 50px;
}

.coin{
  background: #171f29;
  color: #ffff;
  padding: 20px;
  text-align: center;
  margin: 10px 0;

}

.price-up{
  color: #03a978;
}

.price-down{
  color: #eb6b60;
}
.coin-link{
  text-decoration: none;
}
</style>
