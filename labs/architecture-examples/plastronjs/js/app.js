goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('mvc.Collection');
goog.require('mvc.Router');
goog.require('todomvc.listcontrol');
goog.require('todomvc.listmodel');





var todolist = new todomvc.listmodel();

//create the control for the collection.
var todolistControl = new todomvc.listcontrol(todolist);
todolistControl.decorate(goog.dom.getElement('todoapp'));

//setup router
var router = new mvc.Router();


/**
 * @param {string} chosenFilter of selected filter.
 */
var toggleFilters = function(chosenFilter) {
  var filters = goog.dom.getElementsByTagNameAndClass('A', undefined,
    goog.dom.getElement('filters'));
  goog.array.forEach(filters, function(filter) {
    goog.dom.classes.enable(filter, 'selected',
        goog.dom.getTextContent(filter) === chosenFilter);
  });
};

router.route('/', function() {
  todolistControl.setReturnState(todomvc.listcontrol.ReturnState.DEFAULT);
  toggleFilters('All');
});

router.route('/active', function() {
  todolistControl.setReturnState(todomvc.listcontrol.ReturnState.ACTIVE);
  toggleFilters('Active');
});

router.route('/completed', function() {
  todolistControl.setReturnState(todomvc.listcontrol.ReturnState.COMPLETED);
  toggleFilters('Completed');
});

