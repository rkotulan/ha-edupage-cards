//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: ee, getPrototypeOf: te } = Object, p = globalThis, m = p.trustedTypes, ne = m ? m.emptyScript : "", re = p.reactiveElementPolyfillSupport, h = (e, t) => e, g = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ne : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, _ = (e, t) => !l(e, t), ie = {
	attribute: !0,
	type: String,
	converter: g,
	reflect: !1,
	useDefault: !1,
	hasChanged: _
};
Symbol.metadata ??= Symbol("metadata"), p.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var v = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ie) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? ie;
	}
	static _$Ei() {
		if (this.hasOwnProperty(h("elementProperties"))) return;
		let e = te(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(h("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(h("properties"))) {
			let e = this.properties, t = [...f(e), ...ee(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? g : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? g : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? _)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[h("elementProperties")] = /* @__PURE__ */ new Map(), v[h("finalized")] = /* @__PURE__ */ new Map(), re?.({ ReactiveElement: v }), (p.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var y = globalThis, b = (e) => e, x = y.trustedTypes, S = x ? x.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, C = "$lit$", w = `lit$${Math.random().toFixed(9).slice(2)}$`, T = "?" + w, ae = `<${T}>`, E = document, D = () => E.createComment(""), O = (e) => e === null || typeof e != "object" && typeof e != "function", k = Array.isArray, A = (e) => k(e) || typeof e?.[Symbol.iterator] == "function", j = "[ 	\n\f\r]", M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, N = /-->/g, oe = />/g, P = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), se = /'/g, ce = /"/g, le = /^(?:script|style|textarea|title)$/i, F = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), I = Symbol.for("lit-noChange"), L = Symbol.for("lit-nothing"), R = /* @__PURE__ */ new WeakMap(), z = E.createTreeWalker(E, 129);
function B(e, t) {
	if (!k(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return S === void 0 ? t : S.createHTML(t);
}
var V = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = M;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === M ? c[1] === "!--" ? o = N : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = P) : (le.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = P) : o = oe : o === P ? c[0] === ">" ? (o = i ?? M, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? P : c[3] === "\"" ? ce : se) : o === ce || o === se ? o = P : o === N || o === oe ? o = M : (o = P, i = void 0);
		let d = o === P && e[t + 1].startsWith("/>") ? " " : "";
		a += o === M ? n + ae : l >= 0 ? (r.push(s), n.slice(0, l) + C + n.slice(l) + w + d) : n + w + (l === -2 ? t : d);
	}
	return [B(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, H = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = V(t, n);
		if (this.el = e.createElement(l, r), z.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = z.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(C)) {
					let t = u[o++], n = i.getAttribute(e).split(w), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? ue : r[1] === "?" ? de : r[1] === "@" ? fe : K
					}), i.removeAttribute(e);
				} else e.startsWith(w) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (le.test(i.tagName)) {
					let e = i.textContent.split(w), t = e.length - 1;
					if (t > 0) {
						i.textContent = x ? x.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], D()), z.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], D());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === T) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(w, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += w.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = E.createElement("template");
		return n.innerHTML = e, n;
	}
};
function U(e, t, n = e, r) {
	if (t === I) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = O(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = U(e, i._$AS(e, t.values), i, r)), t;
}
var W = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? E).importNode(t, !0);
		z.currentNode = r;
		let i = z.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new G(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new pe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = z.nextNode(), a++);
		}
		return z.currentNode = E, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, G = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = L, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = U(this, e, t), O(e) ? e === L || e == null || e === "" ? (this._$AH !== L && this._$AR(), this._$AH = L) : e !== this._$AH && e !== I && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? A(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== L && O(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = H.createElement(B(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new W(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = R.get(e.strings);
		return t === void 0 && R.set(e.strings, t = new H(e)), t;
	}
	k(t) {
		k(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(D()), this.O(D()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = b(e).nextSibling;
			b(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, K = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = L, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = L;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = U(this, e, t, 0), a = !O(e) || e !== this._$AH && e !== I, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = U(this, r[n + o], t, o), s === I && (s = this._$AH[o]), a ||= !O(s) || s !== this._$AH[o], s === L ? e = L : e !== L && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === L ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, ue = class extends K {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === L ? void 0 : e;
	}
}, de = class extends K {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== L);
	}
}, fe = class extends K {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = U(this, e, t, 0) ?? L) === I) return;
		let n = this._$AH, r = e === L && n !== L || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== L && (n === L || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, pe = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		U(this, e);
	}
}, me = {
	M: C,
	P: w,
	A: T,
	C: 1,
	L: V,
	R: W,
	D: A,
	V: U,
	I: G,
	H: K,
	N: de,
	U: fe,
	B: ue,
	F: pe
}, he = y.litHtmlPolyfillSupport;
he?.(H, G), (y.litHtmlVersions ??= []).push("3.3.3");
var ge = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new G(t.insertBefore(D(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, q = globalThis, J = class extends v {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ge(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return I;
	}
};
J._$litElement$ = !0, J.finalized = !0, q.litElementHydrateSupport?.({ LitElement: J });
var _e = q.litElementPolyfillSupport;
_e?.({ LitElement: J }), (q.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region src/timetable.ts
function Y(e, t) {
	let n = new Intl.DateTimeFormat("en-CA", {
		timeZone: t,
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).formatToParts(e);
	return [
		"year",
		"month",
		"day"
	].map((e) => n.find((t) => t.type === e).value).join("-");
}
function X(e, t) {
	let n = /* @__PURE__ */ new Date(`${e}T12:00:00Z`);
	return n.setUTCDate(n.getUTCDate() + t), n.toISOString().slice(0, 10);
}
function ve(e) {
	return X(e, -(((/* @__PURE__ */ new Date(`${e}T12:00:00Z`)).getUTCDay() + 6) % 7));
}
function ye(e) {
	let t = (/* @__PURE__ */ new Date(`${e}T12:00:00Z`)).getUTCDay();
	return X(ve(e), t === 0 || t === 6 ? 7 : 0);
}
function Z(e, t) {
	let n = new Intl.DateTimeFormat("en-GB", {
		timeZone: t,
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).formatToParts(e);
	return Number(n.find((e) => e.type === "hour").value) * 60 + Number(n.find((e) => e.type === "minute").value);
}
function Q(e) {
	return `${String(Math.floor(e / 60)).padStart(2, "0")}:${String(e % 60).padStart(2, "0")}`;
}
function $(e) {
	let t = e.students ?? (e.entity ? [{ entity: e.entity }] : []);
	if (!Array.isArray(t) || !t.length || t.some((e) => !e || typeof e.entity != "string" || !e.entity.startsWith("calendar."))) throw Error("Configure entity: calendar.… or students: [{ entity: calendar.…, name: … }]");
	if (e.available_days !== void 0 && (!Number.isInteger(e.available_days) || e.available_days < 1 || e.available_days > 366)) throw Error("available_days must be an integer between 1 and 366");
	return t;
}
function be(e) {
	return `start=${encodeURIComponent(X(e, -1) + "T00:00:00Z")}&end=${encodeURIComponent(X(e, 8) + "T00:00:00Z")}`;
}
function xe(e, t, n) {
	let r = [], i = Array.from({ length: 7 }, (e, n) => X(t, n));
	return e.forEach((e, t) => {
		let a = !!e.start?.date, o = new Date(e.start?.dateTime ?? `${e.start?.date}T00:00:00Z`), s = new Date(e.end?.dateTime ?? `${e.end?.date}T00:00:00Z`);
		if (!Number.isFinite(+o) || !Number.isFinite(+s) || s <= o) return;
		let c = a ? e.start.date : Y(o, n), l = a ? e.end.date : Y(s, n), u = a ? 0 : Z(o, n), d = a ? 0 : Z(s, n);
		for (let n of i) {
			if (n < c || n > l || n === l && d === 0) continue;
			let i = n === c ? u : 0, o = n === l ? d : 1440;
			if (o <= i) continue;
			let s = e.description ?? "", f = s.match(/^Teacher\(s\):\s*(.*)$/m)?.[1] ?? "";
			r.push({
				id: `${e.uid ?? t}-${n}`,
				day: n,
				title: (e.summary ?? "").replace(/^\[Canceled\]\s*/, "") || "—",
				description: s,
				teacher: f === "Unknown Teacher" ? "" : f,
				location: e.location ?? "",
				start: i,
				end: o,
				allDay: a || i === 0 && o >= 1439,
				cancelled: (e.summary ?? "").startsWith("[Canceled] "),
				lane: 0
			});
		}
	}), r.sort((e, t) => e.day.localeCompare(t.day) || e.start - t.start || e.end - t.end);
}
function Se(e) {
	let t = [];
	return {
		lessons: [...e].sort((e, t) => e.start - t.start || e.end - t.end).map((e) => {
			let n = t.findIndex((t) => t <= e.start);
			return n === -1 && (n = t.length), t[n] = e.end, {
				...e,
				lane: n
			};
		}),
		lanes: Math.max(1, t.length)
	};
}
function Ce(e) {
	let t = 0;
	for (let n of e) t = t * 31 + n.charCodeAt(0) | 0;
	return (t % 360 + 360) % 360;
}
function we(e) {
	let t = e.filter((e) => !e.allDay);
	return {
		start: Math.floor(Math.min(480, ...t.map((e) => e.start)) / 60) * 60,
		end: Math.ceil(Math.max(900, ...t.map((e) => e.end)) / 60) * 60
	};
}
//#endregion
//#region src/calendar-controller.ts
var Te = class {
	constructor(e) {
		this.host = e, this.events = [], this.loading = !1, this.error = !1, this.request = 0, this.key = "", this.active = !1, e.addController(this);
	}
	hostConnected() {
		this.active = !0, this.key = "", this.interval = setInterval(() => {
			this.refresh();
		}, 3e5), this.host.requestUpdate();
	}
	hostDisconnected() {
		this.active = !1, this.request++, clearInterval(this.interval);
	}
	update(e, t, n) {
		this.current = {
			hass: e,
			entity: t,
			week: n
		};
		let r = `${t}/${n}/${e.states[t]?.last_updated}/${e.config.time_zone}`;
		r !== this.key && this.active && (this.key = r, this.refresh());
	}
	async refresh() {
		if (!this.active || !this.current) return;
		let e = ++this.request, { hass: t, entity: n, week: r } = this.current;
		this.events = [], this.updated = void 0, this.loading = !0, this.error = !1, this.host.requestUpdate();
		try {
			let i = t.states[n];
			if (!i || ["unavailable", "unknown"].includes(i.state)) throw Error("Unavailable");
			let a = await t.callApi("GET", `calendars/${encodeURIComponent(n)}?${be(r)}`);
			if (!Array.isArray(a)) throw Error("Invalid calendar response");
			if (e !== this.request || !this.active) return;
			this.events = a, this.updated = /* @__PURE__ */ new Date();
		} catch {
			if (e !== this.request || !this.active) return;
			this.error = !0;
		} finally {
			e === this.request && this.active && (this.loading = !1, this.host.requestUpdate());
		}
	}
}, Ee = o`
  :host { --lesson-height: 88px; --lane-height: 98px; display: block; container-type: inline-size; color: var(--primary-text-color, #182635); }
  * { box-sizing: border-box; }
  ha-card { display: block; overflow: visible; background: var(--ha-card-background, var(--card-background-color, #fff)); border-radius: var(--ha-card-border-radius, 18px); }
  button, select { font: inherit; color: inherit; }
  button { cursor: pointer; }
  button:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color, #007b83); outline-offset: 3px; }
  button:disabled { opacity: .35; cursor: default; }
  .card-title { padding: 22px 24px 0; overflow-wrap: anywhere; }
  .student-row { display: flex; justify-content: flex-end; min-width: 0; }
  .eyebrow { font-size: 10px; letter-spacing: .16em; font-weight: 700; color: var(--secondary-text-color, #687987); margin-bottom: 5px; }
  h2 { font-size: 23px; letter-spacing: -.03em; line-height: 1.2; margin: 0; font-weight: 650; }
  .toolbar { display: grid; grid-template-columns: auto auto minmax(0, 1fr); align-items: center; gap: 12px; padding: 18px 24px 16px; }
  .period-controls { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .refresh { flex-shrink: 0; }
  .navigation { display: flex; align-items: center; gap: 7px; }
  .tool { border: 1px solid var(--divider-color, #d9e1e6); background: transparent; border-radius: 9px; padding: 7px 12px; min-height: 36px; }
  .arrow { font-size: 19px; line-height: 20px; }
  .range { font-size: 14px; font-weight: 600; }
  .muted, footer { color: var(--secondary-text-color, #687987); }
  .desktop { overflow-x: auto; padding: 0 20px 12px; }
  .grid { min-width: 800px; }
  .row { display: grid; grid-template-columns: 70px 1fr; border-top: 1px solid var(--divider-color, #e7edf0); }
  .axis { height: 34px; position: relative; margin-left: 70px; font-size: 11px; color: var(--secondary-text-color, #687987); }
  .tick { position: absolute; transform: translateX(-50%); top: 5px; }
  .tick:first-child { transform: none; }
  .tick:last-child { transform: translateX(-100%); }
  .day-label { padding: 15px 8px 8px 0; display: flex; flex-direction: column; gap: 3px; }
  .day-label strong { font-size: 14px; }
  .day-label span { font-size: 11px; color: var(--secondary-text-color, #687987); }
  .today .day-label strong { color: var(--primary-color, #007b83); }
  .today { background: color-mix(in srgb, var(--primary-color, #007b83) 5%, transparent); }
  .track { position: relative; min-height: calc(var(--lane-height) + 8px); background: repeating-linear-gradient(to right, var(--divider-color, #e7edf0) 0 1px, transparent 1px var(--hour-width)); }
  .lesson { position: absolute; top: calc(7px + var(--lane) * var(--lane-height)); left: var(--left); width: var(--width); height: var(--lesson-height); padding: 8px; text-align: left; border: 1px solid var(--lesson-border); border-left: 3px solid var(--lesson-accent); border-radius: 7px; overflow: hidden; background: var(--lesson-bg); color: var(--lesson-text); display: flex; flex-direction: column; gap: 3px; }
  .lesson:hover { filter: brightness(.96); }
  .lesson .meta { display: flex; justify-content: space-between; gap: 5px; font-size: 10px; line-height: 1.4; flex-shrink: 0; white-space: nowrap; }
  .lesson .meta > :first-child { flex: 0 0 auto; }
  .lesson .meta > :last-child { flex: 1 1 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; text-align: right; }
  .lesson strong { flex-shrink: 0; font-size: 12px; line-height: 1.25; max-height: 2.5em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .lesson .teacher { flex-shrink: 0; font-size: 10px; line-height: 1.4; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; margin-top: auto; }
  .lesson.current { outline: 2px solid var(--primary-color, #007b83); outline-offset: -2px; }
  .lesson.cancelled { opacity: .7; color: var(--primary-text-color, #182635); background: var(--secondary-background-color, #eee); border-color: var(--divider-color, #ccc); }
  .lesson.cancelled strong { text-decoration: line-through; }
  .all-day { position: static; width: 100%; min-height: 55px; height: auto; margin: 7px 0; justify-content: center; }
  .all-day strong { font-size: 13px; }
  .day-content { min-width: 0; }
  .empty { padding: 26px 12px; font-size: 12px; color: var(--secondary-text-color, #687987); }
  .outside { opacity: .65; }
  .message { padding: 28px 24px; text-align: center; line-height: 1.6; }
  .message button { margin-top: 12px; }
  footer { font-size: 11px; line-height: 1.6; padding: 12px 24px 18px; border-top: 1px solid var(--divider-color, #e7edf0); }
  .detail { position: fixed; inset: 0; margin: auto; width: min(480px, calc(100vw - 32px)); max-height: 85dvh; overflow-y: auto; padding: 24px; color: var(--primary-text-color, #182635); background: var(--ha-card-background, var(--card-background-color, #fff)); border: 1px solid var(--divider-color, #d9e1e6); border-top: 6px solid var(--detail-accent); border-radius: 20px; box-shadow: 0 24px 80px #0006; }
  .detail::backdrop { background: #0008; }
  .detail-close { flex-shrink: 0; min-width: 44px; min-height: 44px; font-size: 22px; }
  .detail-head { display: flex; justify-content: space-between; align-items: start; gap: 12px; }
  .detail-head > div { min-width: 0; }
  .detail h3 { margin: 0 0 16px; font-size: 22px; line-height: 1.3; overflow-wrap: anywhere; }
  .detail p { font-size: 14px; line-height: 1.6; margin: 10px 0; white-space: pre-wrap; overflow-wrap: anywhere; }
  @media (max-width: 600px) {
    .detail { inset: auto 0 0; margin: 0; width: 100%; max-width: none; max-height: 85dvh; border-radius: 24px 24px 0 0; padding: 24px 20px calc(24px + env(safe-area-inset-bottom, 0px)); }
  }
  .mobile { display: none; padding: 0 16px 16px; }
  .days { display: flex; gap: 5px; margin-bottom: 16px; }
  .days button { flex: 1; min-width: 0; border-radius: 10px; padding: 10px 3px; border: 1px solid var(--divider-color, #d9e1e6); background: transparent; font-size: 11px; }
  .days button span { display: block; margin-top: 4px; }
  .days button[aria-pressed=true] { background: var(--primary-color, #007b83); color: var(--text-primary-color, #fff); border-color: transparent; }
  .mobile .lesson { position: static; width: 100%; height: auto; min-height: 80px; margin: 8px 0; padding: 12px; }
  .mobile .lesson strong { font-size: 15px; }
  .mobile .lesson .teacher, .mobile .lesson .meta { font-size: 12px; }
  @container (max-width: 680px) {
    .card-title { padding: 18px 16px 0; }
    h2 { font-size: 21px; }
    .toolbar { padding: 16px; gap: 10px; grid-template-columns: auto minmax(0, 1fr); }
    .student-row { grid-row: 1; grid-column: 2; }
    .period-controls { grid-row: 2; grid-column: 1 / -1; }
    .desktop { display: none; }
    .mobile { display: block; }
    footer { padding: 12px 16px 16px; }
  }
`;
//#endregion
//#region src/colors.ts
function De(e) {
	if (e !== void 0 && (!e || typeof e != "object" || Array.isArray(e) || Object.entries(e).some(([e, t]) => !e.trim() || typeof t != "string" || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(t)))) throw Error("subject_colors must map subject names to quoted hex colors, e.g. Matematika: \"#90caf9\"");
}
function Oe(e, t) {
	let n = t && Object.hasOwn(t, e.trim()) ? t[e.trim()] : void 0;
	if (!n) {
		let t = Ce(e);
		return {
			background: `hsl(${t} 60% 90%)`,
			text: "#182635",
			border: `hsl(${t} 35% 72%)`,
			accent: `hsl(${t} 45% 42%)`
		};
	}
	let r = n.length === 4 ? n.slice(1).split("").map((e) => e + e).join("") : n.slice(1), i = [
		0,
		2,
		4
	].map((e) => parseInt(r.slice(e, e + 2), 16)).map((e) => {
		let t = e / 255;
		return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	}), a = i[0] * .2126 + i[1] * .7152 + i[2] * .0722 > .179 ? "#000000" : "#ffffff";
	return {
		background: n,
		text: a,
		border: `color-mix(in srgb, ${n}, ${a} 25%)`,
		accent: `color-mix(in srgb, ${n}, ${a} 45%)`
	};
}
//#endregion
//#region src/editor.ts
var ke = class extends J {
	constructor(...e) {
		super(...e), this.colorName = "", this.colorValue = "#90caf9";
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			config: { state: !0 },
			colorName: { state: !0 },
			colorValue: { state: !0 }
		};
	}
	static {
		this.styles = o`
    :host { display:block; color:var(--primary-text-color); }
    * { box-sizing:border-box; }
    fieldset { border:1px solid var(--divider-color,#ccc); border-radius:12px; margin:0 0 18px; padding:16px; min-width:0; }
    legend { font-weight:600; padding:0 6px; }
    label { display:flex; flex-direction:column; gap:6px; font-size:14px; margin-bottom:12px; min-width:0; }
    input,select,button { font:inherit; color:inherit; }
    input:not([type=checkbox]),select { width:100%; min-width:0; min-height:40px; padding:8px; border:1px solid var(--divider-color,#aaa); border-radius:8px; background:var(--card-background-color,#fff); }
    input[type=color] { width:60px; padding:4px; }
    button { padding:8px 12px; min-height:40px; border:1px solid var(--divider-color,#aaa); border-radius:8px; background:var(--secondary-background-color,#eee); cursor:pointer; }
    button:disabled { opacity:.4; cursor:default; }
    input:focus-visible,select:focus-visible,button:focus-visible { outline:2px solid var(--primary-color); outline-offset:2px; }
    .toggle { flex-direction:row; align-items:center; gap:10px; }
    .toggle input { width:18px; height:18px; }
    .student { border-bottom:1px solid var(--divider-color,#ccc); margin-bottom:12px; padding-bottom:12px; }
    .actions,.color { display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:10px; }
    .color span { flex:1; overflow-wrap:anywhere; min-width:80px; }
    p { font-size:13px; color:var(--secondary-text-color); line-height:1.5; }
    .new-color { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; align-items:end; }
  `;
	}
	setConfig(e) {
		this.config = { ...e };
	}
	t(e, t) {
		return (this.config?.language ?? this.hass?.language ?? "en").startsWith("cs") ? e : t;
	}
	updateConfig(e) {
		let t = {
			...this.config,
			...e
		};
		for (let e of Object.keys(t)) t[e] === void 0 && delete t[e];
		this.config = t, this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: t },
			bubbles: !0,
			composed: !0
		}));
	}
	get people() {
		return this.config?.students ?? (this.config?.entity ? [{ entity: this.config.entity }] : []);
	}
	savePeople(e) {
		this.updateConfig({
			students: e,
			entity: void 0
		});
	}
	editStudent(e, t) {
		this.savePeople(this.people.map((n, r) => r === e ? {
			...n,
			...t
		} : n));
	}
	moveStudent(e, t) {
		let n = [...this.people];
		[n[e], n[e + t]] = [n[e + t], n[e]], this.savePeople(n);
	}
	color(e, t) {
		let n = { ...this.config?.subject_colors };
		t === void 0 ? delete n[e] : Object.defineProperty(n, e, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}), this.updateConfig({ subject_colors: Object.keys(n).length ? n : void 0 });
	}
	hex(e) {
		return e.length === 4 ? "#" + e.slice(1).split("").map((e) => e + e).join("") : e;
	}
	render() {
		if (!this.config || !this.hass) return L;
		let e = Object.keys(this.hass.states).filter((e) => e.startsWith("calendar.")).sort(), t = this.people, n = e.find((e) => !t.some((t) => t.entity === e)), r = (e, t, n = !1) => F`<label class="toggle"><input type="checkbox" .checked=${this.config[e] ?? n} @change=${(t) => this.updateConfig({ [e]: t.target.checked })}>${t}</label>`;
		return F`
      <fieldset><legend>${this.t("Žáci a kalendáře", "Students and calendars")}</legend>
        <p>${this.t("První žák se zobrazí po otevření karty. Jméno můžete ponechat prázdné a použít název kalendáře.", "The first student is selected when the card opens. Leave the name blank to use the calendar name.")}</p>
        ${t.map((n, r) => F`<div class="student">
          <label>${this.t("Kalendář", "Calendar")} ${r + 1}<select .value=${n.entity} @change=${(e) => this.editStudent(r, { entity: e.target.value })}>
            ${e.includes(n.entity) ? L : F`<option value=${n.entity}>${n.entity} (${this.t("nedostupný", "unavailable")})</option>`}
            ${e.map((e) => F`<option value=${e} ?selected=${e === n.entity}>${this.hass.states[e].attributes.friendly_name ?? e} · ${e}</option>`)}
          </select></label>
          <label>${this.t("Jméno žáka", "Student name")} ${r + 1}<input .value=${n.name ?? ""} @input=${(e) => this.editStudent(r, { name: e.target.value || void 0 })}></label>
          <div class="actions"><button ?disabled=${r === 0} aria-label=${this.t("Posunout žáka nahoru", "Move student up")} @click=${() => this.moveStudent(r, -1)}>↑</button><button ?disabled=${r === t.length - 1} aria-label=${this.t("Posunout žáka dolů", "Move student down")} @click=${() => this.moveStudent(r, 1)}>↓</button><button ?disabled=${t.length <= 1} @click=${() => this.savePeople(t.filter((e, t) => t !== r))}>${this.t("Odebrat žáka", "Remove student")}</button></div>
        </div>`)}
        <button ?disabled=${!n} @click=${() => {
			n && this.savePeople([...t, { entity: n }]);
		}}>${this.t("Přidat žáka", "Add student")}</button>
        ${e.length ? L : F`<p>${this.t("V HA nejsou dostupné žádné kalendáře.", "No calendars are available in HA.")}</p>`}
      </fieldset>
      <fieldset><legend>${this.t("Zobrazení", "Display")}</legend>
        ${r("show_student", this.t("Zobrazit jméno a výběr žáka", "Show student name and picker"), !0)}
        ${this.config.show_student === !1 ? F`<p>${this.t("Zobrazuje se první žák ze seznamu.", "The first student in the list is displayed.")}</p>` : L}
        ${r("show_title", this.t("Zobrazit nadpis", "Show title"))}
        ${this.config.show_title ? F`<label>${this.t("Nadpis", "Title")}<input .value=${this.config.title ?? ""} @input=${(e) => this.updateConfig({ title: e.target.value || void 0 })}></label>` : L}
        ${r("show_weekend", this.t("Zobrazit víkendy", "Show weekends"))}
        <label>${this.t("Jazyk", "Language")}<select .value=${this.config.language ?? ""} @change=${(e) => this.updateConfig({ language: e.target.value || void 0 })}>
          <option value="" ?selected=${!this.config.language}>${this.t("Podle Home Assistantu", "Use Home Assistant language")}</option><option value="cs" ?selected=${this.config.language === "cs"}>Čeština</option><option value="en" ?selected=${this.config.language === "en"}>English</option>
        </select></label>
      </fieldset>
      <fieldset><legend>${this.t("Barvy předmětů", "Subject colors")}</legend>
        <p>${this.t("Barvy se vybírají automaticky. Vlastní barvu přiřaďte přesnému celému názvu předmětu.", "Colors are automatic. Assign an override using the exact full subject name.")}</p>
        ${Object.entries(this.config.subject_colors ?? {}).map(([e, t]) => F`<div class="color"><span>${e}</span><input type="color" aria-label=${this.t("Barva: ", "Color: ") + e} .value=${this.hex(t)} @input=${(t) => this.color(e, t.target.value)}><button aria-label=${this.t("Obnovit automatickou barvu: ", "Restore automatic color: ") + e} @click=${() => this.color(e)}>${this.t("Automaticky", "Automatic")}</button></div>`)}
        <div class="new-color"><label>${this.t("Název předmětu", "Subject name")}<input .value=${this.colorName} @input=${(e) => {
			this.colorName = e.target.value;
		}}></label><label>${this.t("Barva", "Color")}<input type="color" .value=${this.colorValue} @input=${(e) => {
			this.colorValue = e.target.value;
		}}></label></div>
        <button ?disabled=${!this.colorName.trim()} @click=${() => {
			this.color(this.colorName.trim(), this.colorValue), this.colorName = "";
		}}>${this.t("Nastavit barvu", "Set color")}</button>
      </fieldset>
      <details><summary>${this.t("Pokročilé", "Advanced")}</summary><p>${this.t("Dostupný rozsah nezvětšuje historii načítanou konektorem.", "The available range does not extend the history fetched by the integration.")}</p><label>${this.t("Počet dostupných dnů", "Available days")}<input type="number" min="1" max="366" .value=${String(this.config.available_days ?? 14)} @change=${(e) => {
			let t = e.target, n = Number(t.value);
			t.value && Number.isInteger(n) && n >= 1 && n <= 366 ? this.updateConfig({ available_days: n }) : t.value = String(this.config.available_days ?? 14);
		}}></label></details>
    `;
	}
};
customElements.get("edupage-timetable-editor") || customElements.define("edupage-timetable-editor", ke);
//#endregion
//#region src/student-picker.ts
var Ae = class extends J {
	constructor(...e) {
		super(...e), this.names = [], this.selected = 0, this.language = "en", this.caption = "", this.dismiss = (e) => {
			e.composedPath().includes(this) || this.close();
		};
	}
	static {
		this.properties = {
			names: { attribute: !1 },
			selected: { type: Number },
			language: {},
			caption: {}
		};
	}
	static {
		this.styles = o`
    :host { display:block; min-width:0; max-width:100%; color:inherit; }
    * { box-sizing:border-box; }
    button { font:inherit; color:inherit; cursor:pointer; }
    button:focus-visible, summary:focus-visible { outline:2px solid var(--primary-color,#007b83); outline-offset:3px; }
  .student-picker { position: relative; max-width: 100%; font-size: 14px; }
  .student-picker summary, .student-static { display: flex; align-items: center; gap: 10px; min-height: 46px; padding: 6px 12px 6px 8px; border: 1px solid var(--divider-color, #d9e1e6); border-radius: 14px; background: var(--secondary-background-color, #f6f8fa); }
  .student-picker summary { list-style: none; cursor: pointer; }
  .student-static { max-width: 100%; min-width: 0; font-size: 14px; }
  .student-picker summary::-webkit-details-marker { display: none; }
  .student-picker summary:hover, .student-picker[open] summary { border-color: color-mix(in srgb, var(--primary-color, #007b83) 55%, var(--divider-color, #d9e1e6)); }
  .student-avatar { display: grid; place-items: center; flex: 0 0 30px; width: 30px; height: 30px; border-radius: 10px; background: color-mix(in srgb, var(--primary-color, #007b83) 14%, transparent); color: var(--primary-color, #007b83); font-weight: 700; font-size: 13px; }
  .student-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; }
  summary .student-name, .student-static .student-name { max-width: 180px; font-weight: 600; }
  .student-chevron { width: 18px; height: 18px; flex: 0 0 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; opacity: .65; }
  .student-picker[open] .student-chevron { transform: rotate(180deg); }
  .student-options { position: absolute; top: calc(100% + 8px); right: 0; z-index: 20; width: max(100%, 220px); max-width: calc(100vw - 40px); max-height: 300px; overflow-y: auto; padding: 7px; border: 1px solid var(--divider-color, #d9e1e6); border-radius: 16px; background: var(--ha-card-background, var(--card-background-color, #fff)); box-shadow: 0 12px 32px #0003; }
  .student-caption { display: block; padding: 7px 9px 10px; font-size: 11px; color: var(--secondary-text-color, #687987); }
  .student-option { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 46px; padding: 8px; margin: 2px 0; border: 0; border-radius: 10px; background: transparent; }
  .student-option:hover { background: var(--secondary-background-color, #f6f8fa); }
  .student-option[aria-pressed=true] { background: color-mix(in srgb, var(--primary-color, #007b83) 12%, transparent); font-weight: 600; }
  .student-check { margin-left: auto; min-width: 18px; color: var(--primary-color, #007b83); }

  `;
	}
	get picker() {
		return this.renderRoot.querySelector("details");
	}
	close(e = !1) {
		let t = this.picker;
		t && (t.open = !1, e && t.querySelector("summary")?.focus());
	}
	connectedCallback() {
		super.connectedCallback(), document.addEventListener("pointerdown", this.dismiss);
	}
	disconnectedCallback() {
		this.close(), document.removeEventListener("pointerdown", this.dismiss), super.disconnectedCallback();
	}
	keys(e) {
		if (e.key === "Escape") e.preventDefault(), e.stopPropagation(), this.close(!0);
		else if ([
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) {
			e.preventDefault(), this.picker.open = !0;
			let t = [...this.renderRoot.querySelectorAll(".student-option")], n = t.indexOf(this.shadowRoot?.activeElement);
			t[e.key === "Home" ? 0 : e.key === "End" ? t.length - 1 : n < 0 ? e.key === "ArrowUp" ? t.length - 1 : 0 : (n + (e.key === "ArrowDown" ? 1 : -1) + t.length) % t.length]?.focus();
		}
	}
	choose(e) {
		this.close(!0), this.dispatchEvent(new CustomEvent("student-changed", {
			detail: { index: e },
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		if (!this.names.length) return L;
		let e = this.language.startsWith("cs"), t = (e) => F`<span class="student-avatar" aria-hidden="true">${this.names[e].trim().slice(0, 1).toLocaleUpperCase()}</span><span class="student-name">${this.names[e]}</span>`;
		return this.names.length === 1 ? F`<div class="student-static">${t(0)}</div>` : F`<details class="student-picker" @keydown=${this.keys}
      @focusout=${(e) => {
			e.currentTarget.contains(e.relatedTarget) || this.close();
		}}>
      <summary aria-label=${(e ? "Vybrat dítě: " : "Choose student: ") + this.names[this.selected]}>
        ${t(this.selected)}<svg class="student-chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg>
      </summary>
      <div class="student-options" role="group" aria-label=${e ? "Žák" : "Student"}>
        ${this.caption ? F`<span class="student-caption">${this.caption}</span>` : L}
        ${this.names.map((e, n) => F`<button class="student-option" aria-pressed=${n === this.selected} @click=${() => this.choose(n)}>
          ${t(n)}<span class="student-check" aria-hidden="true">${n === this.selected ? "✓" : ""}</span>
        </button>`)}
      </div>
    </details>`;
	}
};
customElements.get("edupage-student-picker") || customElements.define("edupage-student-picker", Ae);
//#endregion
//#region node_modules/lit-html/directive.js
var je = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Me = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, { I: Ne } = me, Pe = {}, Fe = (e, t = Pe) => e._$AH = t, Ie = je(class extends Me {
	constructor() {
		super(...arguments), this.key = L;
	}
	render(e, t) {
		return this.key = e, t;
	}
	update(e, [t, n]) {
		return t !== this.key && (Fe(e), this.key = t), n;
	}
});
//#endregion
//#region src/messages.ts
function Le(e) {
	let t = e.students ?? (e.entity ? [{ entity: e.entity }] : []);
	if (!Array.isArray(t) || !t.length || t.some((e) => !e || typeof e.entity != "string" || !e.entity.startsWith("sensor."))) throw Error("Configure a notification sensor in entity or students.");
	if (e.max_messages !== void 0 && (!Number.isInteger(e.max_messages) || e.max_messages < 1 || e.max_messages > 100)) throw Error("max_messages must be between 1 and 100.");
	return t;
}
function Re(e, t) {
	let n = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::\d{2})?$/.exec(e);
	if (!n) return e;
	let [, r, i, a, o, s] = n;
	return t.startsWith("cs") ? `${Number(a)}. ${Number(i)}. ${r} · ${o}:${s}` : `${a}/${i}/${r} · ${o}:${s}`;
}
function ze(e) {
	let t = !e || ["unavailable", "unknown"].includes(e.state), n = e?.attributes ?? {}, r = n.events, i = [];
	return Array.isArray(r) && r.forEach((e, t) => {
		if (!e || typeof e != "object") return;
		let n = e;
		n.type === "sprava" && i.push({
			key: `${String(n.id ?? t)}-${t}`,
			text: typeof n.text == "string" ? n.text : "",
			author: typeof n.author == "string" ? n.author : "",
			timestamp: typeof n.timestamp == "string" ? n.timestamp : ""
		});
	}), i.sort((e, t) => t.timestamp.localeCompare(e.timestamp)), {
		messages: i,
		unavailable: t,
		unsupported: !t && !Array.isArray(r),
		stale: n.data_stale === !0,
		truncated: n.events_truncated === !0
	};
}
//#endregion
//#region src/messages-editor.ts
var Be = class extends J {
	static {
		this.properties = {
			hass: { attribute: !1 },
			config: { state: !0 }
		};
	}
	static {
		this.styles = ke.styles;
	}
	setConfig(e) {
		this.config = { ...e };
	}
	t(e, t) {
		return (this.config?.language ?? this.hass?.language ?? "en").startsWith("cs") ? e : t;
	}
	updateConfig(e) {
		let t = {
			...this.config,
			...e
		};
		t.students && delete t.entity, this.config = t, this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: t },
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		if (!this.config || !this.hass) return L;
		let e = this.config.students ?? (this.config.entity ? [{ entity: this.config.entity }] : []), t = Object.keys(this.hass.states).filter((e) => e.startsWith("sensor.") && (e.startsWith("sensor.edupage_notification_") || Array.isArray(this.hass.states[e].attributes.events))).sort(), n = t.find((t) => !e.some((e) => e.entity === t)), r = (t, n) => this.updateConfig({ students: e.map((e, r) => r === t ? {
			...e,
			...n
		} : e) });
		return F`<fieldset><legend>${this.t("Žáci a zprávy", "Students and messages")}</legend><p>${this.t("Vyberte senzory oznámení EduPage. První žák je výchozí.", "Select EduPage notification sensors. The first student is the default.")}</p>
  ${e.map((n, i) => F`<div class="student"><label>${this.t("Senzor zpráv", "Message sensor")} ${i + 1}<select .value=${n.entity} @change=${(e) => r(i, { entity: e.target.value })}>${t.includes(n.entity) ? L : F`<option value=${n.entity}>${n.entity}</option>`}${t.map((e) => F`<option value=${e} ?selected=${e === n.entity}>${this.hass.states[e].attributes.friendly_name ?? e} · ${e}</option>`)}</select></label>
  <label>${this.t("Jméno žáka", "Student name")} ${i + 1}<input .value=${n.name ?? ""} @input=${(e) => r(i, { name: e.target.value || void 0 })}></label>
  <div class="actions"><button ?disabled=${i === 0} aria-label=${this.t("Posunout nahoru", "Move up")} @click=${() => {
			let t = [...e];
			[t[i - 1], t[i]] = [t[i], t[i - 1]], this.updateConfig({ students: t });
		}}>↑</button><button ?disabled=${e.length <= 1} @click=${() => this.updateConfig({ students: e.filter((e, t) => i !== t) })}>${this.t("Odebrat žáka", "Remove student")}</button></div></div>`)}
  <button ?disabled=${!n} @click=${() => {
			n && this.updateConfig({ students: [...e, { entity: n }] });
		}}>${this.t("Přidat žáka", "Add student")}</button></fieldset>
  <fieldset><legend>${this.t("Zobrazení", "Display")}</legend><label>${this.t("Nadpis", "Title")}<input .value=${this.config.title ?? ""} @input=${(e) => this.updateConfig({ title: e.target.value || void 0 })}></label>
  <label class="toggle"><input type="checkbox" .checked=${this.config.show_student !== !1} @change=${(e) => this.updateConfig({ show_student: e.target.checked })}>${this.t("Zobrazit jméno a výběr žáka", "Show student name and picker")}</label>
  <label>${this.t("Počet zpráv", "Message limit")}<input type="number" min="1" max="100" .value=${String(this.config.max_messages ?? 10)} @change=${(e) => {
			let t = e.target, n = Number(t.value);
			Number.isInteger(n) && n >= 1 && n <= 100 ? this.updateConfig({ max_messages: n }) : t.value = String(this.config.max_messages ?? 10);
		}}></label>
  <label>${this.t("Jazyk", "Language")}<select .value=${this.config.language ?? ""} @change=${(e) => this.updateConfig({ language: e.target.value || void 0 })}><option value="" ?selected=${!this.config.language}>Home Assistant</option><option value="cs" ?selected=${this.config.language === "cs"}>Čeština</option><option value="en" ?selected=${this.config.language === "en"}>English</option></select></label></fieldset>`;
	}
};
customElements.get("edupage-messages-editor") || customElements.define("edupage-messages-editor", Be);
//#endregion
//#region src/messages-card.ts
var Ve = class extends J {
	constructor(...e) {
		super(...e), this.studentIndex = 0, this.detailPointerOutside = !1;
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			config: { state: !0 },
			studentIndex: { state: !0 },
			detail: { state: !0 }
		};
	}
	static {
		this.styles = [Ee, o`
    .messages-head { display:flex; gap:14px; align-items:center; justify-content:space-between; padding:20px; }
    .messages-head h2 { font-size:20px; min-width:0; overflow-wrap:anywhere; }
    .messages-head edupage-student-picker { flex-shrink:1; min-width:0; }
    .messages-list { padding:0 16px 16px; }
    .notice { padding:12px 16px; margin:0 16px 12px; border-radius:10px; background:var(--secondary-background-color,#f1f5f7); font-size:13px; line-height:1.5; }
    .school-message { display:block; width:100%; text-align:left; color:inherit; background:transparent; border:1px solid var(--divider-color,#d9e1e6); border-radius:12px; margin:10px 0; padding:16px; }
    .school-message:hover { background:var(--secondary-background-color,#f1f5f7); }
    .message-detail { --detail-accent:var(--primary-color,#007b83); }
    @media (min-width: 601px) { .message-detail { width:min(760px, calc(100vw - 32px)); } }
    .message-detail .message-body { padding:18px 0 0; }
    .message-meta { display:flex; justify-content:space-between; align-items:baseline; gap:10px; flex-wrap:wrap; font-size:12px; color:var(--secondary-text-color,#687987); }
    .message-author { font-size:14px; font-weight:600; color:var(--primary-text-color,#182635); overflow-wrap:anywhere; }
    .message-preview { margin-top:9px; font-size:14px; line-height:1.5; overflow-wrap:anywhere; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
    .message-action { display:block; margin-top:10px; font-size:12px; color:var(--primary-color,#007b83); }
    .message-body { white-space:pre-wrap; overflow-wrap:anywhere; line-height:1.65; font-size:14px; padding:0 16px 18px; }
    .message-count { padding:0 20px; font-size:12px; color:var(--secondary-text-color,#687987); }
    @container(max-width:460px) { .messages-head { flex-wrap:wrap; } .messages-head edupage-student-picker { margin-left:auto; } }
  `];
	}
	setConfig(e) {
		Le(e), this.closeDetail(), this.config = { ...e }, this.studentIndex = 0;
	}
	static getConfigElement() {
		return document.createElement("edupage-messages-editor");
	}
	static getStubConfig(e) {
		return {
			type: "custom:edupage-messages-card",
			entity: Object.keys(e.states).find((e) => e.startsWith("sensor.edupage_notification_")) ?? "sensor.edupage_notification_student"
		};
	}
	getCardSize() {
		return 5;
	}
	getGridOptions() {
		return {
			columns: 12,
			rows: "auto",
			min_columns: 6
		};
	}
	t(e, t) {
		return (this.config?.language ?? this.hass?.language ?? "en").startsWith("cs") ? e : t;
	}
	async openDetail(e) {
		if (this.detail = e, await this.updateComplete, !this.isConnected || this.detail !== e) return;
		let t = this.renderRoot.querySelector(".detail");
		t && !t.open && t.showModal();
	}
	closeDetail() {
		this.renderRoot?.querySelector(".detail")?.close(), this.detail = void 0, this.detailPointerOutside = !1;
	}
	disconnectedCallback() {
		this.closeDetail(), super.disconnectedCallback();
	}
	outsideDetail(e) {
		let t = e.currentTarget, n = t.getBoundingClientRect();
		return e.target === t && (e.clientX < n.left || e.clientX > n.right || e.clientY < n.top || e.clientY > n.bottom);
	}
	render() {
		if (!this.config || !this.hass) return L;
		let e = Le(this.config), t = e[this.studentIndex], n = (t) => String(e[t].name ?? this.hass.states[e[t].entity]?.attributes.student ?? this.hass.states[e[t].entity]?.attributes.friendly_name ?? e[t].entity), r = ze(this.hass.states[t.entity]), i = r.messages.slice(0, this.config.max_messages ?? 10);
		return F`<ha-card>
      <div class="messages-head"><h2>${this.config.title ?? this.t("Zprávy ze školy", "School messages")}</h2>
        ${this.config.show_student === !1 ? L : F`<edupage-student-picker
          .names=${e.map((e, t) => n(t))} .selected=${this.studentIndex} .language=${this.config.language ?? this.hass.language}
          .caption=${this.t("Zobrazit zprávy", "Show messages")}
          @student-changed=${(e) => {
			this.closeDetail(), this.studentIndex = e.detail.index;
		}}></edupage-student-picker>`}
      </div>
      ${r.unavailable ? F`<div class="notice" role="alert">${this.t("Senzor zpráv není dostupný. Zkontrolujte připojení konektoru.", "The message sensor is unavailable. Check the integration connection.")}</div>` : r.unsupported ? F`<div class="notice" role="alert">${this.t("Senzor neposkytuje seznam událostí. Vyberte senzor oznámení EduPage s atributem events.", "The sensor does not provide an event list. Select an EduPage notification sensor with the events attribute.")}</div>` : F`
        ${r.stale ? F`<div class="notice" role="status">${this.t("Údaje mohou být zastaralé. Zobrazuje se poslední dostupná historie.", "Data may be stale. Showing the last available history.")}</div>` : L}
        ${r.truncated ? F`<div class="notice">${this.t("Konektor poskytuje jen část historie. Starší zprávy zde mohou chybět.", "The integration provides only part of the history. Older messages may be missing.")}</div>` : L}
        <div class="message-count">${this.t("Zobrazeno", "Showing")} ${i.length} ${this.t("z", "of")} ${r.messages.length} ${this.t("dostupných zpráv", "available messages")}</div>
        ${Ie(t.entity, F`<div class="messages-list">${i.length ? i.map((e) => Ie(e.key, F`<button class="school-message" @click=${() => void this.openDetail(e)}>
          <span class="message-meta"><span class="message-author">${e.author || this.t("Odesílatel neuveden", "Sender unavailable")}</span><span>${Re(e.timestamp, this.config.language ?? this.hass.language) || this.t("Datum neuvedeno", "Date unavailable")}</span></span>
          <div class="message-preview">${(e.text.length > 200 ? e.text.slice(0, 200) + "…" : e.text) || this.t("Text zprávy není dostupný.", "Message text is unavailable.")}</div><span class="message-action">${this.t("Číst zprávu", "Read message")} →</span>
        </button>`)) : F`<div class="empty">${this.t("V dostupné historii nejsou žádné zprávy.", "There are no messages in the available history.")}</div>`}</div>`)}
      `}
      ${this.detail ? F`<dialog class="detail message-detail" aria-labelledby="message-detail-title"
        @cancel=${(e) => {
			e.preventDefault(), e.stopPropagation(), this.closeDetail();
		}}
        @close=${() => {
			this.detail = void 0;
		}}
        @pointerdown=${(e) => {
			this.detailPointerOutside = this.outsideDetail(e);
		}}
        @click=${(e) => {
			this.detailPointerOutside && this.outsideDetail(e) && this.closeDetail();
		}}>
        <div class="detail-head"><div><div class="eyebrow">${this.t("ZPRÁVA PRO", "MESSAGE FOR")} ${n(this.studentIndex)}</div>
          <h3 id="message-detail-title">${this.detail.author || this.t("Odesílatel neuveden", "Sender unavailable")}</h3></div>
          <button class="tool detail-close" autofocus aria-label=${this.t("Zavřít zprávu", "Close message")} @click=${this.closeDetail}>×</button></div>
        <div class="message-meta">${Re(this.detail.timestamp, this.config.language ?? this.hass.language) || this.t("Datum neuvedeno", "Date unavailable")}</div>
        <div class="message-body">${this.detail.text || this.t("Text zprávy není dostupný.", "Message text is unavailable.")}</div>
      </dialog>` : L}
      <footer>${this.t("Zobrazení zprávy zde nemění stav přečtení v EduPage.", "Viewing a message here does not mark it as read in EduPage.")}</footer>
    </ha-card>`;
	}
};
customElements.get("edupage-messages-card") || customElements.define("edupage-messages-card", Ve);
var He = window;
He.customCards ??= [], He.customCards.push({
	type: "edupage-messages-card",
	name: "EduPage Messages",
	description: "School messages from EduPage notification sensors.",
	preview: !0
});
//#endregion
//#region src/index.ts
var Ue = class extends J {
	constructor(...e) {
		super(...e), this.week = "", this.studentIndex = 0, this.selectedDay = 0, this.now = /* @__PURE__ */ new Date(), this.calendar = new Te(this), this.detailPointerOutside = !1;
	}
	static {
		this.styles = Ee;
	}
	static {
		this.properties = {
			hass: { attribute: !1 },
			config: { state: !0 },
			week: { state: !0 },
			studentIndex: { state: !0 },
			selectedDay: { state: !0 },
			detail: { state: !0 },
			now: { state: !0 }
		};
	}
	async openDetail(e) {
		if (this.detail = e, await this.updateComplete, !this.isConnected || this.detail !== e) return;
		let t = this.renderRoot.querySelector(".detail");
		t && !t.open && t.showModal();
	}
	closeDetail() {
		this.renderRoot.querySelector(".detail")?.close(), this.detail = void 0, this.detailPointerOutside = !1;
	}
	outsideDetail(e) {
		let t = e.currentTarget, n = t.getBoundingClientRect();
		return e.target === t && (e.clientX < n.left || e.clientX > n.right || e.clientY < n.top || e.clientY > n.bottom);
	}
	setConfig(e) {
		$(e), De(e.subject_colors), this.config = { ...e }, this.studentIndex = 0, this.week = "", this.detail = void 0;
	}
	getCardSize() {
		return 8;
	}
	static getConfigElement() {
		return document.createElement("edupage-timetable-editor");
	}
	getGridOptions() {
		return {
			columns: "full",
			rows: "auto",
			min_columns: 6
		};
	}
	static getStubConfig(e) {
		return {
			type: "custom:edupage-timetable-card",
			entity: Object.keys(e.states).find((e) => /^calendar\.edupage_/.test(e) && !/canteen|assignments/.test(e)) ?? "calendar.edupage_student"
		};
	}
	connectedCallback() {
		super.connectedCallback(), this.now = /* @__PURE__ */ new Date(), this.timer = setInterval(() => {
			this.now = /* @__PURE__ */ new Date();
		}, 3e4);
	}
	disconnectedCallback() {
		this.closeDetail(), super.disconnectedCallback(), clearInterval(this.timer);
	}
	willUpdate(e) {
		if (!this.hass || !this.config) return;
		let t = Y(this.now, this.hass.config.time_zone);
		if (!this.week) {
			this.week = ye(t);
			let e = Array.from({ length: 7 }, (e, t) => X(this.week, t)).indexOf(t);
			this.selectedDay = Math.max(0, Math.min(this.config.show_weekend ? 6 : 4, e));
		}
		this.calendar.update(this.hass, $(this.config)[this.studentIndex].entity, this.week);
	}
	get cs() {
		return (this.config?.language ?? this.hass?.language ?? "en").startsWith("cs");
	}
	t(e, t) {
		return this.cs ? e : t;
	}
	format(e, t = !1) {
		return new Intl.DateTimeFormat(this.cs ? "cs-CZ" : "en-GB", {
			timeZone: "UTC",
			...t ? { weekday: "short" } : {
				day: "numeric",
				month: "numeric"
			}
		}).format(/* @__PURE__ */ new Date(`${e}T12:00:00Z`));
	}
	move(e) {
		this.week = X(this.week, e * 7), this.selectedDay = 0, this.detail = void 0;
	}
	lesson(e, t, n, r) {
		let i = e.day === r && !e.cancelled && !e.allDay && Z(this.now, this.hass.config.time_zone) >= e.start && Z(this.now, this.hass.config.time_zone) < e.end, a = this.config?.subject_labels?.[e.title] ?? e.title, o = Oe(e.title, this.config?.subject_colors);
		return F`<button class="lesson ${e.allDay ? "all-day" : ""} ${e.cancelled ? "cancelled" : ""} ${i ? "current" : ""}"
      style=${`--lesson-bg:${o.background};--lesson-text:${o.text};--lesson-border:${o.border};--lesson-accent:${o.accent};--lane:${e.lane};--left:${(e.start - t) / (n - t) * 100}%;--width:calc(${(e.end - e.start) / (n - t) * 100}% - 3px)`}
      aria-label=${`${e.title}, ${this.format(e.day)}, ${e.allDay ? this.t("Celý den", "All day") : Q(e.start) + "–" + Q(e.end)}${e.cancelled ? ", " + this.t("Zrušeno", "Cancelled") : ""}`}
      title=${e.title} @click=${() => void this.openDetail(e)}>
      <span class="meta"><span>${e.allDay ? this.t("Celý den", "All day") : `${Q(e.start)}–${Q(e.end)}`}</span><span>${e.location}</span></span>
      <strong>${a}</strong><span class="teacher">${e.cancelled ? this.t("Zrušeno", "Cancelled") : e.teacher}</span>
    </button>`;
	}
	render() {
		if (!this.config || !this.hass || !this.week) return L;
		let e = Y(this.now, this.hass.config.time_zone), t = X(e, (this.config.available_days ?? 14) - 1), n = $(this.config), r = (e) => String(n[e].name ?? this.hass.states[n[e].entity]?.attributes.friendly_name ?? n[e].entity), i = this.config.show_weekend ? 7 : 5, a = Array.from({ length: i }, (e, t) => X(this.week, t)), o = (n) => n >= e && n <= t, s = xe(this.calendar.events, this.week, this.hass.config.time_zone).filter((e) => o(e.day)), { start: c, end: l } = we(s), u = Array.from({ length: (l - c) / 60 + 1 }, (e, t) => c + t * 60), d = (e) => o(e) ? this.t("Kalendář nevrátil žádné události.", "The calendar returned no events.") : this.t("Mimo dostupný rozsah konektoru.", "Outside the integration’s available range."), f = (e) => s.filter((t) => t.day === e);
		return F`<ha-card>
      ${this.config.show_title ? F`<h2 class="card-title">${this.config.title ?? this.t("Rozvrh", "Timetable")}</h2>` : L}
      <div class="toolbar">
        <div class="navigation"><button class="tool arrow" aria-label=${this.t("Předchozí týden", "Previous week")} ?disabled=${X(this.week, i - 8) < e} @click=${() => this.move(-1)}>‹</button>
          <button class="tool" @click=${() => {
			this.week = "", this.detail = void 0;
		}}>${this.t("Dnes", "Today")}</button>
          <button class="tool arrow" aria-label=${this.t("Další týden", "Next week")} ?disabled=${X(this.week, 7) > t} @click=${() => this.move(1)}>›</button></div>
        <div class="period-controls"><span class="range">${this.format(this.week)} – ${this.format(X(this.week, i - 1))} <span class="muted">${this.week.slice(0, 4)}</span></span>
        <button class="tool refresh" aria-label=${this.t("Obnovit rozvrh", "Refresh timetable")} @click=${() => {
			this.detail = void 0, this.calendar.refresh();
		}}>↻</button>
        </div>
      ${this.config.show_student === !1 ? L : F`<div class="student-row">
        <edupage-student-picker .names=${n.map((e, t) => r(t))} .selected=${this.studentIndex}
          .language=${this.cs ? "cs" : "en"} .caption=${this.t("Zobrazit rozvrh", "Show timetable")}
          @student-changed=${(e) => {
			this.closeDetail(), this.studentIndex = e.detail.index;
		}}></edupage-student-picker>
      </div>`}
      </div>
      ${this.calendar.loading ? F`<div class="message" role="status">${this.t("Načítám rozvrh…", "Loading timetable…")}</div>` : this.calendar.error ? F`<div class="message" role="alert">${this.t("Rozvrh se nepodařilo načíst. Zkontrolujte dostupnost kalendáře v HA.", "Could not load the timetable. Check that the calendar is available in HA.")}<br><button class="tool" @click=${() => void this.calendar.refresh()}>${this.t("Zkusit znovu", "Try again")}</button></div>` : F`<div class="desktop"><div class="grid">
          <div class="axis">${u.map((e) => F`<span class="tick" style=${`left:${(e - c) / (l - c) * 100}%`}>${Q(e)}</span>`)}</div>
          ${a.map((t) => {
			let n = f(t), r = Se(n.filter((e) => !e.allDay));
			return F`
            <div class="row ${t === e ? "today" : ""} ${o(t) ? "" : "outside"}">
              <div class="day-label"><strong>${this.format(t, !0)}</strong><span>${this.format(t)}</span></div>
              <div class="day-content">${n.filter((e) => e.allDay).map((t) => this.lesson(t, c, l, e))}
                ${r.lessons.length ? F`<div class="track" style=${`height:calc(${r.lanes} * var(--lane-height) + 8px);--hour-width:${60 / (l - c) * 100}%`}>${r.lessons.map((t) => this.lesson(t, c, l, e))}</div>` : n.length ? L : F`<div class="empty">${d(t)}</div>`}</div>
            </div>`;
		})}
        </div></div>
        <div class="mobile"><div class="days">${a.map((e, t) => F`<button aria-pressed=${t === this.selectedDay} @click=${() => {
			this.selectedDay = t, this.detail = void 0;
		}}>${this.format(e, !0)}<span>${this.format(e)}</span></button>`)}</div>
          ${f(a[this.selectedDay]).length ? f(a[this.selectedDay]).map((t) => this.lesson(t, c, l, e)) : F`<div class="empty">${d(a[this.selectedDay])}</div>`}
        </div>`}
      ${this.detail ? F`<dialog class="detail" aria-labelledby="lesson-detail-title"
        style=${`--detail-accent:${Oe(this.detail.title, this.config.subject_colors).background}`}
        @cancel=${(e) => {
			e.preventDefault(), e.stopPropagation(), this.closeDetail();
		}}
        @close=${() => {
			this.detail = void 0;
		}}
        @pointerdown=${(e) => {
			this.detailPointerOutside = this.outsideDetail(e);
		}}
        @click=${(e) => {
			this.detailPointerOutside && this.outsideDetail(e) && this.closeDetail();
		}}>
        <div class="detail-head"><div><div class="eyebrow">${this.t("DETAIL HODINY", "LESSON DETAILS")}</div><h3 id="lesson-detail-title">${this.detail.title}</h3></div><button class="tool detail-close" autofocus aria-label=${this.t("Zavřít detail", "Close details")} @click=${this.closeDetail}>×</button></div>
        <p>${this.format(this.detail.day, !0)} ${this.format(this.detail.day)} · ${this.detail.allDay ? this.t("Celý den", "All day") : `${Q(this.detail.start)}–${Q(this.detail.end)}`}</p>
        ${this.detail.cancelled ? F`<p>${this.t("Zrušená hodina", "Cancelled lesson")}</p>` : L}
        ${this.detail.teacher ? F`<p>${this.t("Vyučující", "Teacher")}: ${this.detail.teacher}</p>` : L}
        ${this.detail.location ? F`<p>${this.t("Učebna", "Room")}: ${this.detail.location}</p>` : L}
        ${this.detail.description && !this.detail.description.startsWith("Teacher(s):") ? F`<p>${this.detail.description}</p>` : L}
      </dialog>` : L}
      <footer>${this.t("Dostupný rozsah", "Available range")}: ${this.format(e)} – ${this.format(t)}. ${this.t("Prázdný den nemusí znamenat volno.", "An empty day does not necessarily mean no school.")}
        ${this.calendar.updated ? F`<br>${this.t("Načteno", "Loaded")} ${new Intl.DateTimeFormat(this.cs ? "cs" : "en", {
			timeZone: this.hass.config.time_zone,
			hour: "2-digit",
			minute: "2-digit"
		}).format(this.calendar.updated)}` : L}</footer>
    </ha-card>`;
	}
};
customElements.get("edupage-timetable-card") || customElements.define("edupage-timetable-card", Ue);
var We = window;
We.customCards ??= [], We.customCards.push({
	type: "edupage-timetable-card",
	name: "EduPage Timetable",
	description: "A weekly school timetable with a mobile daily view.",
	preview: !0
});
//#endregion
export { Ue as EdupageTimetableCard };
