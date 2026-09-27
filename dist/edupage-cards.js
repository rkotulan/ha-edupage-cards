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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: ee } = Object, m = globalThis, h = m.trustedTypes, te = h ? h.emptyScript : "", ne = m.reactiveElementPolyfillSupport, g = (e, t) => e, _ = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? te : null;
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
}, v = (e, t) => !l(e, t), y = {
	attribute: !0,
	type: String,
	converter: _,
	reflect: !1,
	useDefault: !1,
	hasChanged: v
};
Symbol.metadata ??= Symbol("metadata"), m.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = y) {
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
		return this.elementProperties.get(e) ?? y;
	}
	static _$Ei() {
		if (this.hasOwnProperty(g("elementProperties"))) return;
		let e = ee(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(g("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(g("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
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
			let i = (n.converter?.toAttribute === void 0 ? _ : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? _ : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? v)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[g("elementProperties")] = /* @__PURE__ */ new Map(), b[g("finalized")] = /* @__PURE__ */ new Map(), ne?.({ ReactiveElement: b }), (m.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var x = globalThis, S = (e) => e, C = x.trustedTypes, w = C ? C.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, re = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, E = "?" + T, ie = `<${E}>`, D = document, O = () => D.createComment(""), k = (e) => e === null || typeof e != "object" && typeof e != "function", A = Array.isArray, ae = (e) => A(e) || typeof e?.[Symbol.iterator] == "function", j = "[ 	\n\f\r]", M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, N = /-->/g, P = />/g, F = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), oe = /'/g, se = /"/g, I = /^(?:script|style|textarea|title)$/i, L = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), R = Symbol.for("lit-noChange"), z = Symbol.for("lit-nothing"), B = /* @__PURE__ */ new WeakMap(), V = D.createTreeWalker(D, 129);
function H(e, t) {
	if (!A(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return w === void 0 ? t : w.createHTML(t);
}
var ce = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = M;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === M ? c[1] === "!--" ? o = N : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = F) : (I.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = F) : o = P : o === F ? c[0] === ">" ? (o = i ?? M, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? F : c[3] === "\"" ? se : oe) : o === se || o === oe ? o = F : o === N || o === P ? o = M : (o = F, i = void 0);
		let d = o === F && e[t + 1].startsWith("/>") ? " " : "";
		a += o === M ? n + ie : l >= 0 ? (r.push(s), n.slice(0, l) + re + n.slice(l) + T + d) : n + T + (l === -2 ? t : d);
	}
	return [H(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, U = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ce(t, n);
		if (this.el = e.createElement(l, r), V.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = V.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(re)) {
					let t = u[o++], n = i.getAttribute(e).split(T), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? ue : r[1] === "?" ? de : r[1] === "@" ? fe : K
					}), i.removeAttribute(e);
				} else e.startsWith(T) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (I.test(i.tagName)) {
					let e = i.textContent.split(T), t = e.length - 1;
					if (t > 0) {
						i.textContent = C ? C.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], O()), V.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], O());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === E) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(T, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += T.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = D.createElement("template");
		return n.innerHTML = e, n;
	}
};
function W(e, t, n = e, r) {
	if (t === R) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = k(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = W(e, i._$AS(e, t.values), i, r)), t;
}
var le = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? D).importNode(t, !0);
		V.currentNode = r;
		let i = V.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new G(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new pe(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = V.nextNode(), a++);
		}
		return V.currentNode = D, r;
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
		this.type = 2, this._$AH = z, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = W(this, e, t), k(e) ? e === z || e == null || e === "" ? (this._$AH !== z && this._$AR(), this._$AH = z) : e !== this._$AH && e !== R && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ae(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== z && k(this._$AH) ? this._$AA.nextSibling.data = e : this.T(D.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = U.createElement(H(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new le(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = B.get(e.strings);
		return t === void 0 && B.set(e.strings, t = new U(e)), t;
	}
	k(t) {
		A(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(O()), this.O(O()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = S(e).nextSibling;
			S(e).remove(), e = t;
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
		this.type = 1, this._$AH = z, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = z;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = W(this, e, t, 0), a = !k(e) || e !== this._$AH && e !== R, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = W(this, r[n + o], t, o), s === R && (s = this._$AH[o]), a ||= !k(s) || s !== this._$AH[o], s === z ? e = z : e !== z && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === z ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, ue = class extends K {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === z ? void 0 : e;
	}
}, de = class extends K {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== z);
	}
}, fe = class extends K {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = W(this, e, t, 0) ?? z) === R) return;
		let n = this._$AH, r = e === z && n !== z || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== z && (n === z || r);
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
		W(this, e);
	}
}, me = x.litHtmlPolyfillSupport;
me?.(U, G), (x.litHtmlVersions ??= []).push("3.3.3");
var he = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new G(t.insertBefore(O(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, q = globalThis, J = class extends b {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = he(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return R;
	}
};
J._$litElement$ = !0, J.finalized = !0, q.litElementHydrateSupport?.({ LitElement: J });
var ge = q.litElementPolyfillSupport;
ge?.({ LitElement: J }), (q.litElementVersions ??= []).push("4.2.2");
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
function _e(e) {
	return X(e, -(((/* @__PURE__ */ new Date(`${e}T12:00:00Z`)).getUTCDay() + 6) % 7));
}
function ve(e) {
	let t = (/* @__PURE__ */ new Date(`${e}T12:00:00Z`)).getUTCDay();
	return X(_e(e), t === 0 || t === 6 ? 7 : 0);
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
function ye(e) {
	return `start=${encodeURIComponent(X(e, -1) + "T00:00:00Z")}&end=${encodeURIComponent(X(e, 8) + "T00:00:00Z")}`;
}
function be(e, t, n) {
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
function xe(e) {
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
function Se(e) {
	let t = 0;
	for (let n of e) t = t * 31 + n.charCodeAt(0) | 0;
	return (t % 360 + 360) % 360;
}
function Ce(e) {
	let t = e.filter((e) => !e.allDay);
	return {
		start: Math.floor(Math.min(480, ...t.map((e) => e.start)) / 60) * 60,
		end: Math.ceil(Math.max(900, ...t.map((e) => e.end)) / 60) * 60
	};
}
//#endregion
//#region src/calendar-controller.ts
var we = class {
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
			let a = await t.callApi("GET", `calendars/${encodeURIComponent(n)}?${ye(r)}`);
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
}, Te = o`
  :host { --lesson-height: 88px; --lane-height: 98px; display: block; container-type: inline-size; color: var(--primary-text-color, #182635); }
  * { box-sizing: border-box; }
  ha-card { display: block; overflow: visible; background: var(--ha-card-background, var(--card-background-color, #fff)); border-radius: var(--ha-card-border-radius, 18px); }
  button, select { font: inherit; color: inherit; }
  button { cursor: pointer; }
  button:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color, #007b83); outline-offset: 3px; }
  button:disabled { opacity: .35; cursor: default; }
  .card-title { padding: 22px 24px 0; overflow-wrap: anywhere; }
  .student-row { display: flex; justify-content: flex-end; padding: 0 24px 14px; min-width: 0; }
  .eyebrow { font-size: 10px; letter-spacing: .16em; font-weight: 700; color: var(--secondary-text-color, #687987); margin-bottom: 5px; }
  h2 { font-size: 23px; letter-spacing: -.03em; line-height: 1.2; margin: 0; font-weight: 650; }
  .student-picker { position: relative; max-width: 100%; font-size: 14px; }
  .student-picker summary { display: flex; align-items: center; gap: 10px; list-style: none; cursor: pointer; min-height: 46px; padding: 6px 12px 6px 8px; border: 1px solid var(--divider-color, #d9e1e6); border-radius: 14px; background: var(--secondary-background-color, #f6f8fa); }
  .student-picker summary::-webkit-details-marker { display: none; }
  .student-picker summary:hover, .student-picker[open] summary { border-color: color-mix(in srgb, var(--primary-color, #007b83) 55%, var(--divider-color, #d9e1e6)); }
  .student-avatar { display: grid; place-items: center; flex: 0 0 30px; width: 30px; height: 30px; border-radius: 10px; background: color-mix(in srgb, var(--primary-color, #007b83) 14%, transparent); color: var(--primary-color, #007b83); font-weight: 700; font-size: 13px; }
  .student-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; }
  summary .student-name { max-width: 180px; font-weight: 600; }
  .student-chevron { width: 18px; height: 18px; flex: 0 0 18px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; opacity: .65; }
  .student-picker[open] .student-chevron { transform: rotate(180deg); }
  .student-options { position: absolute; top: calc(100% + 8px); right: 0; z-index: 20; width: max(100%, 220px); max-width: calc(100vw - 40px); max-height: 300px; overflow-y: auto; padding: 7px; border: 1px solid var(--divider-color, #d9e1e6); border-radius: 16px; background: var(--ha-card-background, var(--card-background-color, #fff)); box-shadow: 0 12px 32px #0003; }
  .student-caption { display: block; padding: 7px 9px 10px; font-size: 11px; color: var(--secondary-text-color, #687987); }
  .student-option { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 46px; padding: 8px; margin: 2px 0; border: 0; border-radius: 10px; background: transparent; }
  .student-option:hover { background: var(--secondary-background-color, #f6f8fa); }
  .student-option[aria-pressed=true] { background: color-mix(in srgb, var(--primary-color, #007b83) 12%, transparent); font-weight: 600; }
  .student-check { margin-left: auto; min-width: 18px; color: var(--primary-color, #007b83); }
  .toolbar { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 12px; padding: 18px 24px 12px; }
  .navigation { display: flex; align-items: center; gap: 7px; }
  .tool { border: 1px solid var(--divider-color, #d9e1e6); background: transparent; border-radius: 9px; padding: 7px 12px; min-height: 36px; }
  .arrow { font-size: 19px; line-height: 20px; }
  .range { font-size: 14px; font-weight: 600; }
  .muted, footer { color: var(--secondary-text-color, #687987); }
  .badge { font-size: 11px; background: var(--secondary-background-color, #f0f5f6); border-radius: 6px; padding: 5px 8px; overflow-wrap: anywhere; min-width: 0; }
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
    .student-row { padding: 0 16px 12px; }
    h2 { font-size: 21px; }
    .toolbar { padding: 16px 16px 12px; gap: 10px; }
    .desktop { display: none; }
    .mobile { display: block; }
    footer { padding: 12px 16px 16px; }
  }
  @container (max-width: 460px) {
    .toolbar { grid-template-columns: 1fr auto; }
    .range { grid-row: 2; grid-column: 1 / -1; }
    .refresh { grid-row: 1; grid-column: 2; }
  }
`;
//#endregion
//#region src/colors.ts
function Ee(e) {
	if (e !== void 0 && (!e || typeof e != "object" || Array.isArray(e) || Object.entries(e).some(([e, t]) => !e.trim() || typeof t != "string" || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(t)))) throw Error("subject_colors must map subject names to quoted hex colors, e.g. Matematika: \"#90caf9\"");
}
function De(e, t) {
	let n = t && Object.hasOwn(t, e.trim()) ? t[e.trim()] : void 0;
	if (!n) {
		let t = Se(e);
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
//#region src/index.ts
var Oe = class extends J {
	constructor(...e) {
		super(...e), this.week = "", this.studentIndex = 0, this.selectedDay = 0, this.now = /* @__PURE__ */ new Date(), this.calendar = new we(this), this.detailPointerOutside = !1, this.dismissStudentPicker = (e) => {
			let t = this.renderRoot.querySelector(".student-picker");
			t && !e.composedPath().includes(t) && (t.open = !1);
		};
	}
	static {
		this.styles = Te;
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
	closeStudentPicker(e = !1) {
		let t = this.renderRoot.querySelector(".student-picker");
		t && (t.open = !1, e && t.querySelector("summary")?.focus());
	}
	studentKeys(e) {
		let t = e.currentTarget;
		if (e.key === "Escape") e.preventDefault(), e.stopPropagation(), this.closeStudentPicker(!0);
		else if ([
			"ArrowDown",
			"ArrowUp",
			"Home",
			"End"
		].includes(e.key)) {
			e.preventDefault(), t.open = !0;
			let n = [...t.querySelectorAll(".student-option")], r = n.indexOf(this.shadowRoot?.activeElement);
			n[e.key === "Home" ? 0 : e.key === "End" ? n.length - 1 : r < 0 ? e.key === "ArrowUp" ? n.length - 1 : 0 : (r + (e.key === "ArrowDown" ? 1 : -1) + n.length) % n.length]?.focus();
		}
	}
	setConfig(e) {
		$(e), Ee(e.subject_colors), this.config = { ...e }, this.studentIndex = 0, this.week = "", this.detail = void 0;
	}
	getCardSize() {
		return 8;
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
		super.connectedCallback(), document.addEventListener("pointerdown", this.dismissStudentPicker), this.now = /* @__PURE__ */ new Date(), this.timer = setInterval(() => {
			this.now = /* @__PURE__ */ new Date();
		}, 3e4);
	}
	disconnectedCallback() {
		this.closeDetail(), super.disconnectedCallback(), clearInterval(this.timer), document.removeEventListener("pointerdown", this.dismissStudentPicker), this.closeStudentPicker();
	}
	willUpdate(e) {
		if (!this.hass || !this.config) return;
		let t = Y(this.now, this.hass.config.time_zone);
		if (!this.week) {
			this.week = ve(t);
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
		let i = e.day === r && !e.cancelled && !e.allDay && Z(this.now, this.hass.config.time_zone) >= e.start && Z(this.now, this.hass.config.time_zone) < e.end, a = this.config?.subject_labels?.[e.title] ?? e.title, o = De(e.title, this.config?.subject_colors);
		return L`<button class="lesson ${e.allDay ? "all-day" : ""} ${e.cancelled ? "cancelled" : ""} ${i ? "current" : ""}"
      style=${`--lesson-bg:${o.background};--lesson-text:${o.text};--lesson-border:${o.border};--lesson-accent:${o.accent};--lane:${e.lane};--left:${(e.start - t) / (n - t) * 100}%;--width:calc(${(e.end - e.start) / (n - t) * 100}% - 3px)`}
      aria-label=${`${e.title}, ${this.format(e.day)}, ${e.allDay ? this.t("Celý den", "All day") : Q(e.start) + "–" + Q(e.end)}${e.cancelled ? ", " + this.t("Zrušeno", "Cancelled") : ""}`}
      title=${e.title} @click=${() => void this.openDetail(e)}>
      <span class="meta"><span>${e.allDay ? this.t("Celý den", "All day") : `${Q(e.start)}–${Q(e.end)}`}</span><span>${e.location}</span></span>
      <strong>${a}</strong><span class="teacher">${e.cancelled ? this.t("Zrušeno", "Cancelled") : e.teacher}</span>
    </button>`;
	}
	render() {
		if (!this.config || !this.hass || !this.week) return z;
		let e = Y(this.now, this.hass.config.time_zone), t = X(e, (this.config.available_days ?? 14) - 1), n = $(this.config), r = n[this.studentIndex], i = (e) => String(n[e].name ?? this.hass.states[n[e].entity]?.attributes.friendly_name ?? n[e].entity), a = this.config.show_weekend ? 7 : 5, o = Array.from({ length: a }, (e, t) => X(this.week, t)), s = (n) => n >= e && n <= t, c = be(this.calendar.events, this.week, this.hass.config.time_zone).filter((e) => s(e.day)), { start: l, end: u } = Ce(c), d = Array.from({ length: (u - l) / 60 + 1 }, (e, t) => l + t * 60), f = (e) => s(e) ? this.t("Kalendář nevrátil žádné události.", "The calendar returned no events.") : this.t("Mimo dostupný rozsah konektoru.", "Outside the integration’s available range."), p = (e) => c.filter((t) => t.day === e);
		return L`<ha-card>
      ${this.config.show_title ? L`<h2 class="card-title">${this.config.title ?? this.t("Rozvrh", "Timetable")}</h2>` : z}
      <div class="toolbar">
        <div class="navigation"><button class="tool arrow" aria-label=${this.t("Předchozí týden", "Previous week")} ?disabled=${X(this.week, a - 8) < e} @click=${() => this.move(-1)}>‹</button>
          <button class="tool" @click=${() => {
			this.week = "", this.detail = void 0;
		}}>${this.t("Dnes", "Today")}</button>
          <button class="tool arrow" aria-label=${this.t("Další týden", "Next week")} ?disabled=${X(this.week, 7) > t} @click=${() => this.move(1)}>›</button></div>
        <span class="range">${this.format(this.week)} – ${this.format(X(this.week, a - 1))} <span class="muted">${this.week.slice(0, 4)}</span></span>
        <button class="tool refresh" aria-label=${this.t("Obnovit rozvrh", "Refresh timetable")} @click=${() => {
			this.detail = void 0, this.calendar.refresh();
		}}>↻</button>
      </div>
      <div class="student-row">
        ${n.length > 1 ? L`<details class="student-picker" @keydown=${this.studentKeys}
          @focusout=${(e) => {
			e.currentTarget.contains(e.relatedTarget) || this.closeStudentPicker();
		}}>
          <summary aria-label=${`${this.t("Vybrat dítě", "Choose student")}: ${i(this.studentIndex)}`}>
            <span class="student-avatar" aria-hidden="true">${i(this.studentIndex).trim().slice(0, 1).toLocaleUpperCase()}</span>
            <span class="student-name">${i(this.studentIndex)}</span>
            <svg class="student-chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg>
          </summary>
          <div class="student-options" role="group" aria-label=${this.t("Dítě", "Student")}>
            <span class="student-caption">${this.t("Zobrazit rozvrh", "Show timetable")}</span>
            ${n.map((e, t) => L`<button class="student-option" aria-pressed=${t === this.studentIndex}
              @click=${() => {
			this.studentIndex = t, this.detail = void 0, this.closeStudentPicker(!0);
		}}>
              <span class="student-avatar" aria-hidden="true">${i(t).trim().slice(0, 1).toLocaleUpperCase()}</span>
              <span class="student-name">${i(t)}</span><span class="student-check" aria-hidden="true">${t === this.studentIndex ? "✓" : ""}</span>
            </button>`)}
          </div>
        </details>` : L`<span class="badge">${r.name ?? this.hass.states[r.entity]?.attributes.friendly_name ?? r.entity}</span>`}
      </div>
      ${this.calendar.loading ? L`<div class="message" role="status">${this.t("Načítám rozvrh…", "Loading timetable…")}</div>` : this.calendar.error ? L`<div class="message" role="alert">${this.t("Rozvrh se nepodařilo načíst. Zkontrolujte dostupnost kalendáře v HA.", "Could not load the timetable. Check that the calendar is available in HA.")}<br><button class="tool" @click=${() => void this.calendar.refresh()}>${this.t("Zkusit znovu", "Try again")}</button></div>` : L`<div class="desktop"><div class="grid">
          <div class="axis">${d.map((e) => L`<span class="tick" style=${`left:${(e - l) / (u - l) * 100}%`}>${Q(e)}</span>`)}</div>
          ${o.map((t) => {
			let n = p(t), r = xe(n.filter((e) => !e.allDay));
			return L`
            <div class="row ${t === e ? "today" : ""} ${s(t) ? "" : "outside"}">
              <div class="day-label"><strong>${this.format(t, !0)}</strong><span>${this.format(t)}</span></div>
              <div class="day-content">${n.filter((e) => e.allDay).map((t) => this.lesson(t, l, u, e))}
                ${r.lessons.length ? L`<div class="track" style=${`height:calc(${r.lanes} * var(--lane-height) + 8px);--hour-width:${60 / (u - l) * 100}%`}>${r.lessons.map((t) => this.lesson(t, l, u, e))}</div>` : n.length ? z : L`<div class="empty">${f(t)}</div>`}</div>
            </div>`;
		})}
        </div></div>
        <div class="mobile"><div class="days">${o.map((e, t) => L`<button aria-pressed=${t === this.selectedDay} @click=${() => {
			this.selectedDay = t, this.detail = void 0;
		}}>${this.format(e, !0)}<span>${this.format(e)}</span></button>`)}</div>
          ${p(o[this.selectedDay]).length ? p(o[this.selectedDay]).map((t) => this.lesson(t, l, u, e)) : L`<div class="empty">${f(o[this.selectedDay])}</div>`}
        </div>`}
      ${this.detail ? L`<dialog class="detail" aria-labelledby="lesson-detail-title"
        style=${`--detail-accent:${De(this.detail.title, this.config.subject_colors).background}`}
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
        ${this.detail.cancelled ? L`<p>${this.t("Zrušená hodina", "Cancelled lesson")}</p>` : z}
        ${this.detail.teacher ? L`<p>${this.t("Vyučující", "Teacher")}: ${this.detail.teacher}</p>` : z}
        ${this.detail.location ? L`<p>${this.t("Učebna", "Room")}: ${this.detail.location}</p>` : z}
        ${this.detail.description && !this.detail.description.startsWith("Teacher(s):") ? L`<p>${this.detail.description}</p>` : z}
      </dialog>` : z}
      <footer>${this.t("Dostupný rozsah", "Available range")}: ${this.format(e)} – ${this.format(t)}. ${this.t("Prázdný den nemusí znamenat volno.", "An empty day does not necessarily mean no school.")}
        ${this.calendar.updated ? L`<br>${this.t("Načteno", "Loaded")} ${new Intl.DateTimeFormat(this.cs ? "cs" : "en", {
			timeZone: this.hass.config.time_zone,
			hour: "2-digit",
			minute: "2-digit"
		}).format(this.calendar.updated)}` : z}</footer>
    </ha-card>`;
	}
};
customElements.get("edupage-timetable-card") || customElements.define("edupage-timetable-card", Oe);
var ke = window;
ke.customCards ??= [], ke.customCards.push({
	type: "edupage-timetable-card",
	name: "EduPage Timetable",
	description: "A weekly school timetable with a mobile daily view.",
	preview: !0
});
//#endregion
export { Oe as EdupageTimetableCard };
