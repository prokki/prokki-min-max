/**
 * Erweitert den jQuery-ajax um einen "Roedel" (Spinner).
 *
 * Es kann ein Objekt mit den Standard Ajax-Parameter übergeben werden (siehe http://api.jquery.com/jquery.ajax/#jQuery-ajax-settings).
 *
 * Neue Parameter:<br/>
 *  - spinnerId
 *  - spinnerImageClass
 *  - spinnerImageSize
 *  - afterComplete
 *
 * Werden keine weiteren Parameter übergeben, wird beim Versenden (Methode {@see beforeSend()}) des Requests ein Roedel aktiviert/sichtbar und beim Abschluss
 * (Methode {@see complete()}) der Roedel wieder deaktiviert/unsichtbar. Dieser Standard-Roedel wird am body-Element angehangen und unterbindet als
 * Overlay jeglichen weiteren Zugriff auf die Seite.
 *
 * Das Layout des Roedels kann über die Eigenschaften <code>spinnerImageClass</code> und <code>spinnerImageSize</code> verändert werden.
 * Zur zeit existieren die folgende Werte für
 * <code>spinnerImageClass</code>:<br/>
 * - circle01 (Standard)<br/>
 * - progressbar01<br/>
 * und die folgenden Werte für <code>spinnerImageSize</code>:<br/>
 * - small [entsprechen 16px]<br/>
 * - medium (Standard) [entsprechen 48px]<br/>
 * - large [entsprechen 96px]
 *
 * Soll nicht der Standard-Roedel (im body-Element verankert) benutzt werden, sondern ein eigener Roedel (der z.B. nur ein Overlay über einen bestimmten
 * Bereich der Seite legt), muss der Selector <code>spinnerId</code> gesetzt werden. Auch hier kann das Layout des eigenen Roedels
 * angepasst werden, es muss die Klasse 'ajax-loading' in Zusammenhang mit den Werten der Eigenschaften <code>spinnerImageClass</code> und/oder
 * <code>spinnerImageSize</code> verwendet werden.
 *
 * Beispiel für Standard-Spinner: <pre>jQuery.portalAjax(
 * &#09;type: "POST",
 * &#09;data: [...]
 * &#09;spinnerImageClass: 'progressbar01',
 * &#09;spinnerImageSize: 'large',
 * &#09;[...]
 * )</pre>
 * Beispiel für eigenen Spinner:<pre>
 *        <div id="mySpinner" class="ajax-loading progressbar01"></div></pre>
 *    Der Aufruf für portalAjax sieht wie folgt aus: <pre>jQuery.portalAjax(
 * &#09;type: "POST",
 * &#09;data: [...]
 * &#09;spinnerId: 'mySpinner',
 * &#09;[...]
 * )</pre>
 *
 * Die Eigenschaft/Funktion (Methode {@see beforeSend()}) wird nach dem Einblenden des Overlays/Roedels ausgeführt, die Funktion (Methode {@see complete()})
 * vor dem Ausblenden. Soll nach dem Ausblenden des Overlays (und vor error/success) noch eine Funktion ausgeführt werden, kann die neue Eigenschaft/Funktion
 * <code>afterComplete</code> verwendet werden, die eine Funktion erwartet.

 * @param {Object} settings
 *
 * @returns {jqXHR}
 */


/**
 *
 * @param {object} options  - initial options
 *
 * @property {object}  _options                 - properties of SelectableTable
 * @property {string}  _options.attr_min_max    - attribute specifying the type of the number input field - either "min" or "max"
 * @property {string}  _options.attr_min_max_id - attribute specifying the unique id of depending input number fields
 *
 * @constructor
 */
var prokkiMinMax = function ($element, options)
{
	this.$_elementMin = null;
	this.$_elementMax = null;
	this._id = "";

	this._options = {};

	this._initializeOptions(options);

	this._initializeElements($element);

	this.reset();

	this._initializeEvents();

	this.$_elementMin.data('prokki-min-max', this);
	this.$_elementMax.data('prokki-min-max', this);
};

/**
 *
 * @type {object}
 */
prokkiMinMax.DEFAULTS = {
	attr_min_max: "data-min-max",
	attr_min_max_id: "data-min-max-id"
};

prokkiMinMax.prototype._initializeOptions = function (options)
{
	this._options = jQuery.extend(prokkiMinMax.DEFAULTS, options || {});
};

prokkiMinMax.prototype._initializeElements = function ($element)
{
	this._id = $element.attr(this._options.attr_min_max_id);

	if ( this._id === undefined )
	{
		throw new Error("element has no attribute " + this._options.attr_min_max_id);
	}

	var fields = jQuery(document).find("[" + this._options.attr_min_max_id + "='" + this._id + "']");

	if ( fields.length !== 2 )
	{
		throw new Error("more than two elements detected with attribute " + this._options.attr_min_max_id + "='" + this._id + "'");
	}

	if (
		jQuery(fields[0]).attr(this._options.attr_min_max) === jQuery(fields[1]).attr(this._options.attr_min_max)
	)
	{
		throw new Error("could not determine min/max type (maybe missing attribute " + this._options.attr_min_max + "?)");
	}
	else if (
		jQuery(fields[0]).attr(this._options.attr_min_max) === "min"
		|| jQuery(fields[1]).attr(this._options.attr_min_max) === "max"
	)
	{
		this.$_elementMin = jQuery(fields[0]);
		this.$_elementMax = jQuery(fields[1]);
	}
	else if (
		jQuery(fields[0]).attr(this._options.attr_min_max) === "max"
		|| jQuery(fields[1]).attr(this._options.attr_min_max) === "min"
	)
	{
		this.$_elementMin = jQuery(fields[1]);
		this.$_elementMax = jQuery(fields[0]);
	}
	else
	{
		throw new Error("could not determine min/max type (maybe missing attribute " + this._options.attr_min_max + "?)");
	}
};

prokkiMinMax.prototype._initializeEvents = function ()
{
	this.$_elementMin.change(this.reset.bind(this));
	this.$_elementMax.change(this.reset.bind(this));
};


prokkiMinMax.prototype.reset = function ()
{
	this.$_elementMin.attr("max", this.$_elementMax.val());
	this.$_elementMax.attr("min", this.$_elementMin.val());
};