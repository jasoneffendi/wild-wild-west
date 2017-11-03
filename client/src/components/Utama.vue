<template>
  <div class="hello">
    <div class="tengah">
      <Tengah/>
    </div>
    <div class="hayo">
      <Kiri/>
    </div>
    <div class="hayo">
      <Kanan/>
    </div>
  </div>
</template>

<script>
import Kiri from '@/components/Kiri'
import Tengah from '@/components/Tengah'
import Kanan from '@/components/Kanan'
export default {
  name: 'Utama',
  components: {
    Tengah,
    Kiri,
    Kanan
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hayo {
  height: 300px;
  width: 50%;
  float: left;
}
.tengah {
  height: 300px; 
}
</style>
