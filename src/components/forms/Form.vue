<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="text-h6 fit">
      {{ title }}
      <q-btn color="primary text-white shadow-2" icon="save" label="Kaydet" class="float-right" @click="Save" />
    </div>
    <q-separator inset />

    <q-form class="fit" v-for="(Input, index) in Inputs" :key="index">
      <q-input
        v-for="region in columns"
        :key="region.name"
        outlined
        dense
        bottom-slots
        fill-mask
        lazy-rules
        v-model="Input.data"
        :mask="Input.mask"
        :label="Input.label"
        :type="Input.type"
        :tabIndex="Input.tab"
        :autofocus="Input.autofocus"
        :rules="Input.rules"
        v-if="Input.type === 'text'"
      >
        <template v-slot:prepend>
          <q-icon :name="Input.icon" />
        </template>

        <template v-slot:hint>
          {{ Input.hint }}
        </template>
      </q-input>
      <q-select
        outlined
        v-model="model"
        :options="options"
        :dense="dense"
        :options-dense="denseOpts"
        v-if="Input.type === 'select'"
      >
        <template v-slot:prepend>
          <q-icon name="flight_takeoff" />
        </template>
      </q-select>
      <div>
        <q-btn color="red text-white shadow-2" icon="cancel" label="İptal" class="float-left" @click="regionCancel" />
        <q-btn color="primary text-white shadow-2" icon="save" label="Kaydet" class="float-right" @click="regionSave" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'create',
  methods: {},
  computed: {
    Service() {
      return this.$store.state.Service
    },
    Inputs() {
      return this.$store.state[`${this.Service}`].Form
    },
  },
}
</script>

<style scoped></style>
