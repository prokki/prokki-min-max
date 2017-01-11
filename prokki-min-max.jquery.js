(function (jQuery)
	{
		if ( jQuery.fn.prokkiMinMax == null )
		{

			jQuery.fn.prokkiMinMax = function (options)
			{
				options = options || {};

				if ( typeof options === "object" )
				{
					this.each(function ()
					{
						var instanceOptions = jQuery.extend(true, {}, options);

						var instance = null;

						if ( jQuery(this).data("prokki-min-max") === undefined )
						{
							instance = new prokkiMinMax(jQuery(this), instanceOptions);
						}
						else
						{
							instance = jQuery(this).data("prokki-min-max");

							if ( instance === null && window.console && console.error )
							{
								console.warn("Element already initialized as prokkiMinMax: " + this);
							}
						}
					});

					return this;
				}
				else if ( typeof options === "string" )
				{

					// All methods that should return the element
					var methods = [];

					var return_value;

					var args = Array.prototype.slice.call(arguments, 1);

					this.each(function ()
					{
						var instance = jQuery(this).data('prokki-min-max');

						if ( instance == null && window.console && console.error )
						{
							console.error(
								"The prokkiMinMax('" + options + "') method was called on an " +
								"element that is not using prokkiMinMax."
							);
						}
						else if ( typeof instance[options] !== "function" )
						{
							console.error(
								"Method '" + options + "' is not implemented in prokkiMinMax."
							);
						}

						return_value = instance[options].apply(instance, args);
					});

					// check if we should be returning `this`
					if ( jQuery.inArray(options, methods) > -1 )
					{
						return this;
					}

					return return_value;
				}
				else
				{
					throw new Error('Invalid arguments for prokkiMinMax: ' + options);
				}
			}

		}
	}(jQuery)
);