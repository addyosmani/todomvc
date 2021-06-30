/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
/*global React */
var app = app || {};

(function () {
	'use strict';

	app.TodoFooter = React.createClass({
		render: function () {
			var activeTodoWord = app.Utils.pluralize(this.props.count, 'item');
			var clearButton = null;

			if (this.props.completedCount > 0) {
				clearButton = (
					<button
						className="clear-completed"
						onClick={this.props.onClearCompleted}>
						Clear completed
					</button>
				);
			}

			var nowShowing = this.props.nowShowing;

			var handleTagClick = this.props.handleTagClick

			var todosWithTags = this.props.todos.filter(function (todo) {
				return todo.tag !== '';
			})

			var footerTagList = todosWithTags.map(function (todo) {
				return (
					<li>
						<a
							href={`#/${todo.tag}`}
							className="tags"
							onClick={handleTagClick}>
								{todo.tag}
						</a>
					</li>
				)
			});

			var tagCount = todosWithTags.length;

			var clearTagsButton = null;

			if (tagCount > 0) {
				clearTagsButton = (
					<button
						className="clear-completed"
						onClick={this.props.onClearTags}>
						Clear tags filter
					</button>
				);
			}

			return (
				<footer className="footer">
					<span className="todo-count">
						<strong>{this.props.count}</strong> {activeTodoWord} left
					</span>
					<ul className="filters">
						<li>
							<a
								href="#/"
								className={classNames({selected: nowShowing === app.ALL_TODOS})}>
									All
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/active"
								className={classNames({selected: nowShowing === app.ACTIVE_TODOS})}>
									Active
							</a>
						</li>
						{' '}
						<li>
							<a
								href="#/completed"
								className={classNames({selected: nowShowing === app.COMPLETED_TODOS})}>
									Completed
							</a>
						</li>
					</ul>
					<br></br>
					<ul className="filters tags">
						Filter by tags:
						{footerTagList}
					</ul>
					{clearButton}
					{clearTagsButton}
				</footer>
			);
		}
	});
})();
