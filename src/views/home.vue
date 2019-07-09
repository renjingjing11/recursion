 <template>
    <div>
       <el-tree
  :data="data"
  node-key="id"
  default-expand-all
  @node-drag-start="handleDragStart"
  @node-drag-enter="handleDragEnter"
  @node-drag-leave="handleDragLeave"
  @node-drag-over="handleDragOver"
  @node-drag-end="handleDragEnd"
  @node-drop="handleDrop"
  draggable
  :allow-drop="allowDrop"
  :allow-drag="allowDrag">
</el-tree>
<!-- <i>{{this.list}}</i> -->
<!-- <i>{{this.data}}</i> -->
    </div>
</template>
<script>
import {mapState} from "vuex";
 export default {
    data() {
      return {
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
             id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      },
      // recursion  递归
      recursion(big,small){

        console.log(big,small)

        small.forEach(item=>{
          if(item.children.length){

          }else{
            big.forEach(ite=>{
              if(item.id==ite.parentid){
                let obj={};
                obj.id=ite.id;
                obj.label=ite.name;
                obj.children=[];
                obj.parentid=ite.parentid;
                item.children.push(obj)
              }else{
                if(item.children.length!=0){
                  this.recursion(big,item.children)
                }
              }
            })
          }
        })
        return small;
      }
    },
    computed:{
      ...mapState({
        list:state=>state.Content.list
      }),
      render(){
        let data=[];
        this.list.forEach(item=>{
          if(item.parentid===""){
            let obj={};
            obj.id=item.id;
            obj.label=item.name;
            obj.children=[];
            data.push(obj)
          }
        })
        return data
      }
    },
    created(){
      this.data=JSON.parse(JSON.stringify(this.recursion(this.list,this.render)))
      console.log(this.data)
    }
  };
</script>
<style scoped lang="">

</style>