import { writable, derived } from "svelte/store";

export const students = writable([]);
export const absent = writable([]);
export const present = derived(
    [students, absent],
    ([$students, $absent]) => $students.filter(s => !$absent.includes(s))
);
