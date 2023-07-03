<script>
    import categoryApi from '@/libs/apis/category';
    import itemApi from '@/libs/apis/item';

    export default {
        data() {
            return {
                categories: [],
                items: [],
                name: '',
                categoryId: '',
                desc: '',
                selectedItem: null,
            };
        },
        methods: {
          async onDelete() {
                const state = confirm('Are you sure to Delete?');
                if (state) {
                    const { selectedItem } = this;
                    let result = await itemApi.remove(selectedItem._id);
                    if (result.error) {
                        alert(result.error);
                        return;
                    }
                    this.items = await itemApi.all();
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
                    var category = selectedItem.category;

                    const result = await itemApi.edit({
                        id: selectedItem._id,
                        name,
                        desc,
                        category,
                    });

                    if (result.error) {
                        alert(result.error);
                        return;
                    }

                    this.items = await itemApi.all();
                    this.selectedItem = '';
                }
            },
            async onSubmit(e) {
                e.preventDefault();
                const { name, desc, categoryId } = this;
                const result = await itemApi.create({
                    name,
                    desc,
                    category: categoryId,
                });
                if (!result) {
                    alert(result.error);
                    return;
                }

                this.items = await itemApi.all();
                this.name = this.desc = this.categoryId = '';
            },
        },
        async mounted() {
            this.categories = await categoryApi.all();
            this.items = await itemApi.all();
        },
    };
</script>

<template>
    <main>
        <div class="bg-gray-500 text-white py-2 text-lg text-center">
            <h1>Item</h1>
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
                            type="text"
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div>
                        <label for="category">Choose a category:</label>
                        <select
                            v-model="categoryId"
                            name="category"
                            required
                            class="px-2 mx-2 rounded-sm bg-green-100"
                        >
                            <option
                                v-for="category in categories"
                                :key="category.name"
                                :value="category._id"
                            >
                                {{ category.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <input
                            v-model="desc"
                            required
                            type="text"
                            placeholder="Description"
                        />
                    </div>
                    <div>
                        <button
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
                        <th>Category</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>

                    <tr
                        v-for="item in items"
                        :key="item._id"
                    >
                        <td>
                            <input
                                class="border border-2"
                                type="text"
                                v-model="item.name"
                            />
                        </td>
                        <td v-if="item.category!==null">
                            <select
                                required
                                v-model="item.category._id"
                                name="category"
                                class="px-2 mx-2 rounded-sm bg-green-100"
                            >
                                <option
                                    v-for="cate in categories"
                                    :key="cate.name"
                                    :value="cate._id"
                                >
                                    {{ cate.name }}
                                </option>
                            </select>
                        </td>
                        <td>
                            <input
                                class="border border-2"
                                type="text"
                                v-model="item.desc"
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
                                    v-on:click="
                                        onSelectItem(item), onDelete()
                                    "
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
@import 'bootstrap/dist/css/bootstrap.css';
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
