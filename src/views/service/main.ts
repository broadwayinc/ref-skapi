import { ref } from "vue";
import { serviceList } from "@/views/service-list";
import Service from "@/code/service";

export let currentService: Service = null;
export let serviceMainLoaded = ref(false);
export let serviceUsers: any = {};
export let serviceRecords: any = {};
export let serviceBins: any = {};
export let setService = (id: string) => {
    currentService = serviceList[id];
    serviceMainLoaded.value = true;
}