$(document)
.ready
(
	function()
	{
		ClaudioSelect();
	}
);

function ClaudioSelect()
{
	console.log('ClaudioSelect initiated');
	$('select.select')
	.each
	(
		function()
		{

			var title  = $('option:selected', this).text(),
				handle = '<span class="select-handle"><span class="icon icon-arrow"></span></span>';

			if($(this).hasClass('claudiofakeselect'))
			{
				console.log('ClaudioSelect aborted on the following element:');
				console.log($(this));
				return true;
			}
			else
			{
				if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
				{
					$(this).css({opacity: 0, zIndex: 99});
				}
				else
				{
					$(this).hide();
				}

				$(this)
				.addClass('claudiofakeselect')
				.after
				(
					'<a href="#" class="select">' + title + handle + '</a><ul class="drop"></ul>'
				)
				.change
				(
					function()
					{
						val = $('option:selected',this).text();
						$(this).next().text(val).append(handle);
					}
				)
				.children('option')
				.each
				(
					function()
					{
						var $this = $(this);
						$(this)
						.parent()
						.siblings('.drop')
						.css
						(
							{
								'zIndex': 100
							}
						)
						.hide()
						.append
						(
							'<li><a href="' + $this.val() + '">' + $this.text() + '</a></li>'
						);
					}
				);

				$('.select-field a.select')
				.click
				(
					function(e)
					{
						var $this   = $(this),
							$drop   = $(this).siblings('.drop'),
							$select = $(this).siblings('select.select');
						$drop.trigger('toggle');
						e.preventDefault();
					}
				);

				$('.select-field .drop')
				.each
				(
					function()
					{
						var $this       = $(this),
							$fakeselect = $(this).siblings('a.select'),
							$select     = $(this).siblings('select.select'),
							$handle     = '<span class="select-handle"><span class="icon icon-arrow"></span></span>';

						$this
						.bind
						(
							'show',
							function()
							{
								if($this.is(':animated'))
								{
									return false;
								}
								$fakeselect.addClass('opened');
								$this.slideDown('fast');
							}
						)
						.bind
						(
							'hide',
							function()
							{
								if($this.is(':animated'))
								{
									return false;
								}
								$fakeselect.removeClass('opened');
								$this.slideUp('fast');
							}
						)
						.bind
						(
							'toggle',
							function()
							{
								if($fakeselect.hasClass('opened'))
								{
									$this.trigger('hide');
								}
								else
								{
									$this.trigger('show');
								}
							}
						);

						$('li a', $this)
						.click
						(
							function(e)
							{
								var $this = $(this);
								$('option', $select).removeAttr('selected');
								$('option[value=' + $this.attr('href') + ']', $select).attr('selected', 'true');
								$fakeselect.text($('option[value=' + $this.attr('href') + ']', $select).text()).append($handle);
								e.preventDefault();
							}
						);

						$(document)
						.click
						(
							function(e)
							{
								$this.trigger('hide');
							}
						);
					}
				);
			}
		}
	);
	console.log('ClaudioSelect terminated');
}