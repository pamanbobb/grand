let sukses = 0, gagal = 0, logUsername, logPassword, logLink, lognewPassword, logBio, delay, choice;

	$(document).on('input', 'textarea.user', function() {
		let hitunghasil = $(this).val(), lines = hitunghasil.split('\n');
		hitung = lines.length;
		if(hitung > 30){
			alert("Jok Akeh Akeh, Kemamak !");
			$(this).val('');
			return false;
		}else {
			$('.lab_user').text('Total Username : ' + hitung);
		}
	});
	$(document).on('input', 'textarea.pass', function() {
		let jumlahPassword = $(this).val(), words = jumlahPassword.split('\n');
		getPass = words.length;
		$('.lab_pass').text('Total Password : ' + getPass);
	});
	$(document).on('input', 'textarea.new_pass', function() {
		let uur = $(this).val(), ipi = uur.split('\n');
		anyar = ipi.length;
		$('.thenew_pass').text('Total New Password : ' + anyar);
	});
	$(document).on('input', 'textarea.linkurl', function() {
		let linkw = $(this).val(), pyu = linkw.split('\n');
		gawe = pyu.length;
		$('.lab_link').text('Total Link : ' + gawe);
	});
	$(document).on('input', 'textarea.biografy', function() {
		let bioacc = $(this).val(), erq = bioacc.split('\n');
		hgg = erq.length;
		$('.totalbio').text('Total Bio : ' + hgg);
	});

	$(document).on('change', 'select.maintools', function() {
		var UIDendi = $("option:selected", this), cariUID = this.value;
		$("[class*='addnewlink']").removeClass(function(i, v) {
			return (v.match(/addnewlink/g) || []).join('');
		});
		if (cariUID == "addnewlink") {
			UIDendi.addClass("addnewlink");
		}
	});

	$(document).on('change', 'select.akunne', function() {
		var acc = $("option:selected", this), hdd = this.value;
		$("[class*='anyar'], [class*='lawas']").removeClass(function(i, v) {
			return (v.match(/anyar|lawas/g) || []).join('');
		});
		if (hdd == "anyar") {
			acc.addClass("anyar");
			choice = 'Mulai Running, Akun Anyar';
			delay = 10000;
		}
		if (hdd == "lawas") {
			acc.addClass("lawas");
			choice = 'Mulai Running, Akun Lawas, 1 Menit Per Account';
			delay = 120000;
		}
	});

	$(document).on('click', 'button.incode', () => {
		let in_code = $('input.codemail').val();
		if (!in_code || in_code < 1) {
			alert('Pok Isi Code ne ?');
			return false;
		} else {
			$.ajax({
				url: '/sendcode',
				type: 'post',
				cache: false,
				beforeSend: function() {
					$('button.incode').html('<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Enteni Seg..');
				},
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					'username': logUsername,
					'password': logPassword,
					'external_link': logLink,
					'biografy': logBio,
					'code': in_code
				}
			}).done(
				(data) => {
					sukses++;
					$('span.sukses').text(sukses);
					$('button.incode').text('Input code');
					$('button.codemail').remove();
					$('button.close').click();
					$('.consolelog').text(data.status);
				}).fail((xhr) => {
				let logfail = JSON.parse(xhr.responseText);
				$('span.gagal').text(gagal).css('color', 'red');
				$('button.incode').text('Input code');
				if (logfail.status.indexOf('Please check the code') > -1) {
					$('.consolelog').text('Code Salah');
				} else if (logfail.status.indexOf('Create a password') > -1) {
					$('.consolelog').text('Ganti Password');
					$('button.codemail').remove();
					$('button.close').click();
				} else {
					$('.consolelog').text('Server IG Error');
				}
			})
		}
	});

	$(document).on('click', 'button.elper', () => {
		let penguna = $('textarea.user').val().split('\n'),baseUrl = '/edit',sandine = $('textarea.pass').val(),new_sandi = $('textarea.new_pass').val(),linked = $('textarea.linkurl').val().split('\n'),inbio = $('textarea.biografy').val().split('\n');
		if(!$('select.akunne').find('option.anyar, option.lawas').length > 0){
			alert("Pileh Tipe Akunmu");
			return false;
		}

		if ($('select.maintools').find('option.addnewlink').length > 0) {
			if (!penguna || penguna < 1) {
				alert('Username Pok Isi !');
				return false;
			}
			if (!sandine || sandine < 1) {
				alert('Password Active isi !');
				return false;
			}
			if (!new_sandi || new_sandi < 1) {
				alert('Password Anyar isi !');
				return false;
			}
			if (!linked || linked < 1) {
				alert('Pok Nei Link !');
				return false;
			}
			$('.consolelog').text(choice);
			$('button.elper').text('Run !');
			$.each(penguna, (i, v) => {
				let io = true, pwe = i == penguna.length - 1;
				let stoped = setTimeout(
					() => {
						let linkin = Math.floor(Math.random() * linked.length), lwq = linked[linkin], bio = Math.floor(Math.random() * inbio.length); bioquote = inbio[bio] || '';
						if (pwe) {
							$.ajax({
								url: baseUrl,
								type: 'post',
								beforeSend: function() {
									$('.consolelog').text('Login Sebagai : ' + v);
								},
								headers: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									'username': v,
									'password': sandine,
									'external_link': lwq,
									'new_sandi': new_sandi,
									'biografy': bioquote
								}
							}).done(
								(ut) => {
									if (ut.status.indexOf('Njobo') > -1) {
										$('.consolelog').text(ut.status);
										$('div.spwnCode').html('<button type="button" class="btn inbtn codemail" data-toggle="modal" data-target="#codemail">Verify</button>');
										logUsername = v;
										logPassword = sandine;
										lognewPassword = new_sandi;
										logLink = lwq;
										logBio = bioquote;
										$('button.elper').text('Go !');
									} else {
										sukses++;
										$('span.sukses').text(sukses);
										$('.consolelog').text('Wes Entek !');
										$('button.elper').text('Go !');
									}
								}).fail(
								(xhr) => {
									let logfail = JSON.parse(xhr.responseText),
										consoler = logfail.status.split('; ').pop();
									gagal++;
									$('span.gagal').text(gagal);
									$('button.elper').text('Go !');
									$('.consolelog').text(consoler);
								})
						} else {
							$.ajax({
								url: baseUrl,
								type: 'post',
								beforeSend: function() {
									$('.consolelog').text('Login Sebagai : ' + v);
								},
								headers: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								data: {
									'username': v,
									'password': sandine,
									'external_link': lwq,
									'new_sandi': new_sandi,
									'biografy': bioquote
								}
							}).done(
								(ut) => {
									if (ut.status.indexOf('Njobo') > -1) {
										$('.consolelog').text(ut.status);
										$('div.spwnCode').html('<button type="button" class="btn inbtn codemail" data-toggle="modal" data-target="#codemail">Verify</button>');
										logUsername = v;
										logPassword = sandine;
										lognewPassword = new_sandi;
										logLink = lwq;
										logBio = bioquote;
										$('button.elper').text('Go !');
										clearTimeout(stoped);
									} else {
										sukses++;
										$('span.sukses').text(sukses);
										$('.consolelog').text(ut.status);
									}
								}).fail(
								(xhr) => {
									let logfail = JSON.parse(xhr.responseText),
										consoler = logfail.status.split('; ').pop();
									gagal++;
									$('span.gagal').text(gagal);
									$('.consolelog').text(consoler);
								})
						}
					}, (i + 1) * delay);
				if (pwe) {
					io = false;
					return false;
				}
				return io;
			});
		} else {
			alert('Pilih Opsi Tools Dulu !');
			return false;
		}
	});