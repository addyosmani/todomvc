define('app/controllers/entries', ['ember'],
  /**
   * Entries controller
   *
   * @returns Class
   */
  function() {
    return Ember.ArrayProxy.extend({
      storeBinding: 'Todos.Models.store',
      content: [],

      createNew: function(value) {
        if (!value.trim())
          return;
        var todo = this.get('store').createFromTitle(value);
        this.pushObject(todo);
      },

      pushObject: function (item, ignoreStorage) {
        if (!ignoreStorage)
          this.get('store').create(item);
        return this._super(item);
      },

      removeObject: function (item) {
        item = item.get('todo') || item;
        this.get('store').remove(item);
        return this._super(item);
      },

      clearCompleted: function() {
        this.filterProperty('completed', true).forEach(this.removeObject, this);
      },

      total: function() {
        return this.get('length');
      }.property('@each.length'),

      remaining: function() {
        return this.filterProperty('completed', false).get('length');
      }.property('@each.completed'),

      completed: function() {
        return this.filterProperty('completed', true).get('length');
      }.property('@each.completed'),

      allAreDone: function(key, value) {
        if (value !== undefined) {
          this.setEach('completed', value);

          return value;
        } else {
          return !!this.get('length') && this.everyProperty('completed', true);
        }
      }.property('@each.completed'),

    });
  }
);
