<template>
  <div class='d-flex flex-column wrapper'>
    <SectionPersonal/>
    <SectionSecurity/>
    <SectionContacts/>
  </div>
</template>

<script>
// @ is an alias to /src
import SectionPersonal from '@/components/SectionPersonal.vue'
import SectionSecurity from '@/components/SectionSecurity.vue'
import SectionContacts from '@/components/SectionContacts.vue'

export default {
  name: 'HomeView',
  components: {
    SectionPersonal,
    SectionSecurity,
    SectionContacts
  },
  mounted() {
  }
}


</script>

<style>

</style>
