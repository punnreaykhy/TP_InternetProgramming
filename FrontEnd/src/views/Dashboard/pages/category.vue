<script>
    import categoryApi from '@/libs/apis/category';
    export default {
        data() {
            return {
                categories: [],
                name: '',
                desc: '',
                imageUrl: '',
            };
        },
        methods: {
          async onDelete() {
                const state = confirm('Are you sure to Delete?');
                if (state) {
                    const { selectedItem } = this;
                    let result = await categoryApi.remove(selectedItem._id);
                    if (result.error) {
                        alert(result.error);
                        return;
                    }
                    this.categories = await categoryApi.all();
                    this.selectedItem = '';
                }
            },
            onSelectItem(item) {
                this.selectedItem = item;
            },
            async onEditItem(e) {
                e.preventDefault();
                const { selectedItem } = this;
                const state = confirm('Are you sure to Edit?');
                if (state) {
                    var name = selectedItem.name;
                    var desc = selectedItem.desc;
                    var imageUrl = selectedItem.imageUrl;

                    const result = await categoryApi.edit({
                        id: selectedItem._id,
                        name,
                        desc,
                        imageUrl,
                    });

                    if (result.error) {
                        alert(result.error);
                        return;
                    }

                    this.categories = await categoryApi.all();
                }
            },
            async onSubmit(e) {
                e.preventDefault();
                const { name, desc, imageUrl } = this;
                const result = await categoryApi.create({
                    name,
                    desc,
                    imageUrl,
                });
                if (!result) {
                    alert(result.error);
                    return;
                }

                this.categories = await categoryApi.all();
                this.name = this.desc = this.imageUrl = '';
            },
        },
        async mounted() {
            this.categories = await categoryApi.all();
        },
    };
</script>

<template>
    <main>
        <div class="bg-gray-500 text-white py-2 text-lg text-center">
            <h1>Category</h1>
        </div>

        <div class="py-2">
            <form
                @submit="onSubmit"
                method="post"
            >
                <div class="flex flex-row py-2 px-2 space-x-2 bg-gray-100">
                    <div>
                        <input
                            v-model="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div>
                        <input
                            v-model="desc"
                            name="desc"
                            type="text"
                            placeholder="Description"
                            required
                        />
                    </div>
                    <div>
                        <input
                            v-model="imageUrl"
                            name="imageUrl"
                            type="text"
                            placeholder="ImageURL"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            class="bg-blue-500 text-white p-1 px-2 rounded-md"
                        >
                            Add new
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div>
            <form @submit="onEditItem">
                <table id="customers">
                    <tr class="bg-gray-200">
                        <th>Name</th>
                        <th>Description</th>
                        <th>imgURL</th>
                        <th>Action</th>
                    </tr>

                    <tr
                        v-for="item in categories"
                        :key="item._id"
                    >
                        <td>
                            <input
                                class="border border-2"
                                type="text"
                                v-model="item.name"
                            />
                        </td>
                        <td>
                            <input
                                class="border border-2"
                                type="text"
                                v-model="item.desc"
                            />
                        </td>
                        <td>
                            <input
                                class="border border-2"
                                type="text"
                                v-model="item.imageUrl"
                            />
                        </td>
                        <td>
                            <div class="flex flex-col space-y-2">
                                <button
                                    @click="onSelectItem(item)"
                                    type="submit"
                                    class="btn btn-info"
                                >
                                    Edit
                                </button>
                                <div
                                    v-on:click="onSelectItem(item), onDelete()"
                                    class="btn btn-danger hover:font-bold"
                                >
                                    Delete
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </main>
</template>

<style>
    #customers {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    #customers td,
    #customers th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #customers tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    #customers tr:hover {
        background-color: #ddd;
    }
</style>
