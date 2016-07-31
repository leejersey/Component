var Dialog = (function() {
    'use strict';

    function Modal() {
        this.createDialog();
        this.bindEvent();
    }
    Modal.prototype = {
        defaultOpts: {
            title: '',
            message: '',
            isShowCloseBtn: false,
            isShowConfirmBtn: true,
            onClose: function() {},
            onConfirm: function() {}
        },
        open: function(opts) {
            this.setOpts(opts);
            this.setDialog();
            this.showDialog();
        },
        close: function() {
            this.hideDialog();
        },
        setOpts: function(opts) {
            if (typeof opts === 'object') {
                this.opts = $.extend({}, this.defaultOpts, opts);
            }
        },
        bindEvent: function() {
            var _this = this;
            this.$dialog.find('.btn-close').on('click', function(e) {
                e.preventDefault();
                _this.opts.onClose();
                _this.hideDialog();
            });
            this.$dialog.find('.btn-confirm').on('click', function(e) {
                e.preventDefault();
                _this.opts.onConfirm();
                _this.hideDialog();
            });
            //拖拽
            this.$dialog.on('mousedown', function(e) {
                //此时this是当前DOM对象
                var $dialog = $(this);
                var evtX = e.pageX - $(this).offset().left;
                var evtY = e.pageY - $(this).offset().top;
                $(this).addClass('draggable').data('evtPos', {
                    x: evtX,
                    y: evtY
                });
            });
            $('body').on('mousemove', function(e) {
                $('.draggable').length && $('.draggable').offset({
                    left: e.pageX - $('.draggable').data('evtPos').x,
                    top: e.pageY - $('.draggable').data('evtPos').y
                })
            })
            $('body').on('mouseup', function() {
                $('.draggable').length && $('.draggable').removeClass('draggable').removeData('evtPos');
            })
        },
        createDialog: function() {
            var tpl = ['<div class="dialog" style="display:none">', '<div class="dialog-overlay"></div>', '<div class="dialog-box">', '<div class="dialog-header"><h3></h3><span class="btn-close">x</span></div>', '<div class="dialog-content">', '</div>', '<div class="dialog-footer">', '  <a href="#" class="btn btn-close">取消</a>', '  <a href="#" class="btn btn-confirm">确定</a>', '</div>', '</div>', '</div>'].join('');
            this.$dialog = $(tpl);
            $('body').append(this.$dialog);
        },
        setDialog: function() {
            var $dialog = this.$dialog;
            if (!this.opts.title) {
                $dialog.find('.dialog-header').hide();
            } else {
                $dialog.find('.dialog-header').show();
            }
            if (!this.opts.isShowCloseBtn) {
                $dialog.find('.dialog-footer .btn-close').hide();
            } else {
                $dialog.find('.dialog-footer .btn-close').show();
            }
            if (!this.opts.isShowConfirmBtn) {
                $dialog.find('.btn-confirm').hide();
            } else {
                $dialog.find('.btn-confirm').show();
            }
            $dialog.find('.dialog-header h3').text(this.opts.title);
            $dialog.find('.dialog-content').html(this.opts.message);
        },
        showDialog: function() {
            this.$dialog.show();
        },
        hideDialog: function() {
            this.$dialog.hide();
        }
    }
    return new Modal();
})();
